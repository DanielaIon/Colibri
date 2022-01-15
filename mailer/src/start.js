const nodemailer = require('nodemailer');
const {
  query
} = require('./data');

const buildMessageQueue = require('./rabbitmq/index.js');

(async ()=>{
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "23559df3a5ae1e",
        pass: "0b1e2b662baf96"
      }
    });
  
    const RabbitMQ = await buildMessageQueue(process.env.RABBITMQHOST, 'mail');

    RabbitMQ.subscribe((msg) => {
      const mailDetails = JSON.parse(msg);
      transporter.sendMail({
        from: "notifier.colibri@outlook.com",
        to: mailDetails.to,
        subject: mailDetails.subject,
        text: mailDetails.text
      }, logger);

      query('UPDATE question SET notified = $1 WHERE id = $2', [true, id]);
    });
})();

function logger(err, info) {
  if (err) {
  console.log(err)
  } else {
  console.log(info);
  }
}

