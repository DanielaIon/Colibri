const amqp = require('amqplib/callback_api');
const { promisify } = require('util');

// if the connection is closed or fails to be established at all, we will reconnect
var amqpConn = null;
async function connect(url) {
    await new Promise((resolve, reject) => {
        amqp.connect(url, function(err, conn) {
            if (err) {
              console.error("[AMQP]", err.message);
              return setTimeout(connect(url), 1000);
            }
            conn.on("error", function(err) {
              if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
              }
            });
            conn.on("close", function() {
              console.error("[AMQP] reconnecting");
              return setTimeout(connect(url), 1000);
            });
        
            console.log("[AMQP] connected");
            amqpConn = conn;
            resolve();
        });
    });
}

var pubChannel = null;
var offlinePubQueue = [];
function startPublisher() {
  amqpConn.createConfirmChannel(function(err, ch) {
    if (closeOnErr(err)) return;
    ch.on("error", function(err) {
      console.error("[AMQP] channel error", err.message);
    });
    ch.on("close", function() {
      console.log("[AMQP] channel closed");
    });

    pubChannel = ch;
    while (true && offlinePubQueue.length > 0) {
      var m = offlinePubQueue.shift();
      if (!m) break;
      publish(m[0], m[1], m[2]);
    }
  });
}

// method to publish a message, will queue messages internally if the connection is down and resend later
function publish(exchange, routingKey, content) {
  try {
    pubChannel.publish(exchange, routingKey, content, { persistent: true },
                       function(err, ok) {
                         if (err) {
                           console.error("[AMQP] publish", err);
                           offlinePubQueue.push([exchange, routingKey, content]);
                           pubChannel.connection.close();
                         }
                       });
  } catch (e) {
    console.error("[AMQP] publish", e.message);
    offlinePubQueue.push([exchange, routingKey, content]);
  }
}

// A worker that acks messages only if processed succesfully
var workChannel = null;
function startWorker(routingKey, processFunc, nrPrefetch) {
  amqpConn.createChannel(function(err, ch) {
    if (closeOnErr(err)) return;
    ch.on("error", function(err) {
      console.error("[AMQP] channel error", err.message);
    });
    ch.on("close", function() {
      console.log("[AMQP] channel closed");
    });
    
    workChannel = ch;

    ch.prefetch(nrPrefetch);
    ch.assertQueue(routingKey, { durable: true }, function(err, _ok) {
      if (closeOnErr(err)) return;
      ch.consume(routingKey, processMsg(processFunc), { noAck: false });
      console.log("Worker is started");
    });

    function processMsg(processFunc) {
        return(msg)=>{
            processFunc(msg.content.toString());
            workChannel.ack(msg);
        }
    }
  });
}

function closeOnErr(err) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  amqpConn.close();
  return true;
}

function workerProcessFunc(msg) {
    console.log(msg);
  }

setInterval(function() {
  publish("", "test", new Buffer("work work work"));
}, 1000);

(async () => {
    await connect('amqp://localhost:56721');
    startPublisher();
    startWorker("test", workerProcessFunc, 10);
})();

