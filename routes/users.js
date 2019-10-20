const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');

// @route       POST api/users
// @desc        Register new user
// @access      Public

router.post('/', [
    check('name', 'Please, add name').not().isEmpty(),
    check('email', 'Please, include a valid email').isEmail(),
    check('password', 'Please, enter a password with min 6 characters').isLength({min: 6, max: 21})
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    res.send(req.body)
});

module.exports = router;