const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route       GET api/contacts
// @desc        Get contacts
// @access      Public

router.get('/', auth, async (req, res) => {
    try {
        const contacts = Contact.find({user: req.user.id}).sort({date: -1});
        res.send(contacts)
    } catch(err) {
        res.status(500).json({msg: 'Server error'})
    }
})

// @route       POST api/contacts
// @desc        Add new contacts
// @access      Private

router.post('/', (req, res) => {
    res.send('Add contact')
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