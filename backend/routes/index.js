const Router = require('express')();

const ResourcesController = require('../Resource/controler.js');
const EmployeesController = require('../Employee/controler.js');
const BookingsController = require('../Booking/controler.js');
const QuestionsController = require('../Question/controler.js');

Router.use('/bookings',  BookingsController);
Router.use('/employees', EmployeesController);
Router.use('/resources', ResourcesController);
Router.use('/questions', QuestionsController);

module.exports = Router;