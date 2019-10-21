const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/User');

// @route       POST api/users
// @desc        Register new user
// @access      Public


router.post('/', [
    check('name', 'Please, enter your name').not().isEmpty(),
    check('email', 'Please, include a valid email').isEmail(),
    check('password', 'Password should have min 6 and max 22 characters').isLength({min: 6, max: 22})
], async (req, res) => {
    const {name, email, password} = req.body;

   try {
       let user = User.findOne({email});

       if(user) res.status(400).json({msg: `Email ${email} is already used`});

       user = new User({
           name,
           email,
           password
       });

       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password, salt);

       await user.save();

       res.status(200).json({msg: `User ${name} has registered`})

   } catch(err) {
       console.log(err);
       res.status(500).json({msg: `Server error: ${err}`})
   }
});













router.post('/', [
    check('name', 'Please, add name').not().isEmpty(),
    check('email', 'Please, include a valid email').isEmail(),
    check('password', 'Please, enter a password with min 6 characters').isLength({min: 6, max: 21})
], async  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(user) res.status(400).json({msg: `Email ${email} is already used`})

        user = User({
            name,
            email,
            password
        });

        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).json({msg: `User ${user.name} saved`})

    } catch(err) {
        console.log(err);
        res.status(500).json({mas: 'Server error'})
    }

});

module.exports = router;