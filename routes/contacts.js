const {check, validationResult} = require('express-validator');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

// @route       GET api/contacts
// @desc        Get contacts
// @access      Public

router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.send(contacts)
    } catch(err) {
        res.status(500).json({msg: 'Server error'})
    }
});

// @route       POST api/contacts
// @desc        Add new contacts
// @access      Private

router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty) res.status(400).json({errors: errors.array()});

    const {name, email, phone, type} = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        await res.json({contact});
    } catch(err) {
        res.status(500).send('Server error')
    }
});
// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private

router.put('/', (req, res) => {
    res.send('Update contact')
});
// @route       DELETE api/contacts/:id
// @desc        Delete contact
// @access      Public

router.get('/', (req, res) => {
    res.send('Delete contacts')
});

module.exports = router;