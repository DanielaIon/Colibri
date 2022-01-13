const AMQPClient = require('@cloudamqp/amqp-client');

async function buildMessageQueue(url, subject) {
  try {
    const amqp = new AMQPClient(url);
    const conn = await amqp.connect();
    const ch = await conn.channel();
    const q = await ch.queue(subject);
    return {
      publish: async (msg) => {
        await q.publish(msg, {deliveryMode: 2});
      },
      subscribe: async (processFunc) => {
        await q.subscribe({noAck: true}, async (msg) => {
          processFunc(msg.bodyToString());
        });
        console.log(`Subcribed to "${subject}"`);
      },
      close: async () => {
        await conn.close();
      }
    }
  } catch (e) {
    console.error("ERROR", e)
    e.connection.close()
    // setTimeout(run, 1000) // will try to reconnect in 1s
  }
}

module.exports = buildMessageQueue;

