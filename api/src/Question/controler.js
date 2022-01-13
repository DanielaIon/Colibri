const {
    generateToken,
    authorizeAndExtractToken,
    authorizeAndExtractTokenAdminSuport,
    authorizeAndExtractTokenAdmin
} = require('../security/Jwt/index.js');

const {sendYourMail} =  require('../security/email.js');
const express = require('express');

const QuestionService = require('./services.js');

function initRoutes(context) {
    const router = express.Router();
    const RabbitMQ = context.RabbitMQ;

    //posteaza o resursa
    router.post('/', authorizeAndExtractToken, async (req, res, next) => {
        const emailemployee = req.body.email
        const question = req.body.question
        console.log(emailemployee+" --- "+question)
        try {
            await QuestionService.add(emailemployee, question);
            res.status(201).end();
        } catch (err) {
            next(err);
        }
        
    });

    //obtine toate resursele
    router.get('/', authorizeAndExtractToken, async (req, res, next) => {
        res.json(await QuestionService.getAll());
    });


    //sterge o resursa in functie de id
    router.delete('/:id', authorizeAndExtractTokenAdminSuport, async (req, res, next) => {
        const {
            id
        } = req.params;

        try {
            await QuestionService.deleteById(parseInt(id));
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    });


    router.put('/:id', authorizeAndExtractTokenAdminSuport, async (req, res, next) => {
        const {
            id
        } = req.params;
        const answer = req.body.answer
        const emailemployee = req.body.emailemployee
        const question = req.body.question
        try {
            console.log(answer)
            console.log(emailemployee)
            await QuestionService.updateById(parseInt(id), answer);

            let text = "<p>You asked:  " + question + "<br/>"+ "We answer:  " + answer +"</p>"
            RabbitMQ.publish(JSON.stringify({
                to:emailemployee,
                subject:'Question Answered',
                text
            }));

            res.status(204).end();
        } catch (err) {
            // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
            // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
            next(err);
        }
    });

    return router;
}

module.exports = initRoutes;