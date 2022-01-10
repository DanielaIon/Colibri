const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "23559df3a5ae1e",
      pass: "0b1e2b662baf96"
    }
  });

function logger(err, info) {
    if (err) {
    console.log(err)
    } else {
    console.log(info);
    }
  }

function sendMail(message){
    transporter.sendMail(message, logger);
}


//De test
message = {
    from: "notifier.colibri@outlook.com",
    to: "notifier.colibri@outlook.com",
    subject: "Test",
    text: "Hello SMTP Email"
}

sendMail(message);
