const {
    generateToken,
    authorizeAndExtractToken,
    authorizeAndExtractTokenAdminSuport,
    authorizeAndExtractTokenAdmin
} = require('../security/Jwt/index.js');


const express = require('express');

const ResourceService = require('./services.js');

const router = express.Router();

//posteaza o resursa
router.post('/', authorizeAndExtractTokenAdminSuport, async (req, res, next) => {
    const {
        name,
        details
    } = req.body;

    try {
        await ResourceService.add(name,details);
        res.status(201).end();
    } catch (err) {
        next(err);
    }
    
});

//obtine toate resursele
router.get('/', authorizeAndExtractToken, async (req, res, next) => {
    res.json(await ResourceService.getAll());
});


//sterge o resursa in functie de id
router.delete('/:id', authorizeAndExtractTokenAdminSuport, async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
        await ResourceService.deleteById(parseInt(id));
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});
module.exports = router;