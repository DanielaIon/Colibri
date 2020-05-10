const {
    generateToken,
    authorizeAndExtractToken,
    authorizeAndExtractTokenAdminSuport,
    authorizeAndExtractTokenAdmin
} = require('../security/Jwt/index.js');

const express = require('express');

const UsersService = require('./services.js');
const {
    validateFields
} = require('../utils');

const router = express.Router();


router.post('/register', async (req, res, next) => {
    const {
        password,
        firstName ,
        lastName ,
        email ,
        department ,
        position ,
        role 
    } = req.body;

    // validare de campuri
    try {
        const fieldsToBeValidated = {
            firstName: {
                value: firstName,
                type: 'alpha'
            },
            lastName: {
                value: lastName,
                type: 'alpha'
            },
            email: {
                value: email,
                type: 'ascii'
            },
            password: {
                value: password,
                type: 'ascii'
            },
            role: {
                value: role,
                type:'ascii'
            }
        };

        validateFields(fieldsToBeValidated);

        await UsersService.register(password,
                                    firstName ,
                                    lastName ,
                                    email ,
                                    department ,
                                    position ,
                                    role);
        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

// ruta pt verificarea datelor
router.get('/', authorizeAndExtractTokenAdminSuport, async (req, res, next) => {
    res.json(await UsersService.getEmployees());
});


router.get('/:id', authorizeAndExtractToken, async (req, res, next) => {
    const {
        id
    } = req.params;
    res.json(await UsersService.getEmployeeById(id));
});

//delete user
router.delete('/:id', authorizeAndExtractTokenAdminSuport, async (req, res, next) => {
    const {
        id
    } = req.params;
    res.json(await UsersService.deleteById(id));
});

//login
router.post('/login', async (req, res, next) => {
  const {
      email,
      password
  } = req.body;

  try {
    const fieldsToBeValidated = {
        email: {
            value: email,
            type: 'ascii'
        },
        password: {
            value: password,
            type: 'ascii'
        }
    };

    validateFields(fieldsToBeValidated);

    const token = await UsersService.authenticate(email, password);

    res.status(200).json(token);
} catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
    next(err);
}});


router.put('/:id', authorizeAndExtractTokenAdminSuport, async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        role
    } = req.body;
    try {

        const fieldsToBeValidated = {
            id: {
                value: id,
                type: 'int'
            },
            first_name: {
                value: role,
                type: 'alpha'
            }
        };

        validateFields(fieldsToBeValidated);

        await UsersService.updateRoleById(parseInt(id), role);
        res.status(204).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});


module.exports = router;