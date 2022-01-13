const {
    generateToken,
    authorizeAndExtractToken,
    authorizeAndExtractTokenAdminSuport,
    authorizeAndExtractTokenAdmin
} = require('../security/Jwt/index.js');

const express = require('express');

const BookingService = require('./services.js');
const EmployeeService = require('../Employee/services.js');

function initRoutes(context) {
    const router = express.Router();
    const RabbitMQ = context.RabbitMQ;

    //posteaza o rezervare
    router.post('/', authorizeAndExtractToken, async (req, res, next) => {
        const {
            idResource,
            idEmployee,
            day ,
            startHour,
            endHour ,
            details
        } = req.body;
    
        try {
            await BookingService.add(idResource, idEmployee, day, startHour, endHour, details);
            //publish
            const employeeDetails = await EmployeeService.getEmployeeById(idEmployee);
            console.log(employeeDetails[0].email)
            if(employeeDetails && employeeDetails[0].email ){
                RabbitMQ.publish(new Buffer( employeeDetails[0].email));
            }
            res.status(201).end();
        } catch (err) {
            next(err);
        }
        
    });
    
    //obtine toate rezervarile
    router.get('/', authorizeAndExtractToken, async (req, res, next) => {
        res.json(await BookingService.getAll());
    });
    
    //obtine rezervarile unei persoane
    router.get('/:id', authorizeAndExtractToken, async (req, res, next) => {
        const {
            id
        } = req.params;
    
        res.json(await BookingService.getByEmployeeId(parseInt(id)));
    });
    
    //obtine rezervarile pentru o resursa
    router.get('/resources/:id/:day', authorizeAndExtractToken, async (req, res, next) => {
        const id = req.params.id;
        // const day = new Date(req.params.day);
        res.json(await BookingService.getByResourceId(parseInt(id), req.params.day));
    });
    
    
    //sterge o rezervare in functie de id
    router.delete('/:id', authorizeAndExtractToken, async (req, res, next) => {
        const {
            id
        } = req.params;
    
        try {
            await BookingService.deleteById(parseInt(id));
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    });

    return router;
}

module.exports = initRoutes;