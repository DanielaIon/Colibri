const express = require('express');

const ResourcesController = require('../Resource/controler.js');
const EmployeesController = require('../Employee/controler.js');
const BookingsController = require('../Booking/controler.js');
const QuestionsController = require('../Question/controler.js');

function initRoutes(context) {
    const router = express();

    router.use('/bookings',  BookingsController(context));
    router.use('/employees', EmployeesController(context));
    router.use('/resources', ResourcesController(context));
    router.use('/questions', QuestionsController(context));

    return router;
}

module.exports = initRoutes;