const express = require('express');
const router = express.Router();

// @route       GET api/contacts
// @desc        Get contacts
// @access      Public

router.get('/', (req, res) => {
    res.send('Get all contacts')
});

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