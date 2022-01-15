require('dotenv').config()
const express = require('express');
const morgan = require('morgan'); //middleware de logare
const helmet = require('helmet'); //middleware de securitate
const cors = require('cors'); 

const initRoutes = require('./routes');
const buildMessageQueue = require('./rabbitmq/index.js');

(async ()=>{
    const app = express();

    const RabbitMQ = await buildMessageQueue(process.env.RABBITMQHOST, 'mail');
    
    app.use(cors())
    app.use(helmet());
    app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/api/v1', initRoutes({
        RabbitMQ
    }));

    // handler de erori declarat ca middleware
    app.use((err, req, res, next) => {
        console.trace(err);
        let status = 500;
        let message = 'Something Bad Happened';
        if (err.httpStatus) {
            status = err.httpStatus;
            message = err.message;
        }
        res.status(status).json({
            error: message,
        });
    });
    
    
    app.listen(process.env.PORT, () => {
        console.log(`App is listening on ${process.env.PORT}`);
    });    
})();