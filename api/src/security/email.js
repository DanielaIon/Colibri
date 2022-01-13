const {
    ServerError
} = require('../errors');

const nodemailer = require('nodemailer')

const emailService = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'colibri.mailservice@gmail.com',
        pass: 'colibridb'
    }
});

const sendYourMail = (message) => {
    emailService.sendMail(message, function(err, info){
        if(err){
            throw new ServerError('Nu s-o trimis emailul')
        }

        console.log('S-o trimis emailul')
    }
    
    )
}

module.exports = {
    sendYourMail
}