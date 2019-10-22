const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');

// @route       POST api/users
// @desc        Register new user
// @access      Public

router.post('/', [
    check('name', 'Please, enter your name').not().isEmpty(),
    check('email', 'Please, include a valid email').isEmail(),
    check('password', 'Password should be min 6 and max 22 characters').isLength({min: 6, max: 22})
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) res.status(400).json({errors: errors.array()});

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(user) res.status(400).json({msg: `Email ${email} is already used`})

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        const payload = {
            user: {
                id: user.id
            }
        };

        await user.save();

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if(err) throw err;
            res.json({token})
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({msg: `Server error ${err}`})
    }
})






// router.post('/', [
//     check('name', 'Please, enter your name').not().isEmpty(),
//     check('email', 'Please, include a valid email').isEmail(),
//     check('password', 'Password should have min 6 and max 22 characters').isLength({min: 6, max: 22})
// ], async (req, res) => {
//     const {name, email, password} = req.body;
//
//    try {
//        let user = User.findOne({email});
//
//        if(user) res.status(400).json({msg: `Email ${email} is already used`});
//
//        user = new User({
//            name,
//            email,
//            password
//        });
//
//        const salt = await bcrypt.genSalt(10);
//        user.password = await bcrypt.hash(password, salt);
//
//        await user.save();
//
//        const payload = {
//            user: {
//                id: user.id
//            }
//        };
//
//        jwt.sign(payload, config.get('jwtSecret'), {
//            expiresIn: 36000
//        }, (err, token) => {
//            if(err) throw err;
//            res.json({token})
//        });
//
//        res.status(200).json({msg: `User ${name} has registered`})
//
//    } catch(err) {
//        console.log(err);
//        res.status(500).json({msg: `Server error: ${err}`})
//    }
// });

module.exports = router;