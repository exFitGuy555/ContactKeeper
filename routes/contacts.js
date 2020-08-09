const express = require('express')
const router = express.Router();


// @route   GET  api/contacts
// @desc    get all user contacts
// @access  Public
router.get('/', (req, res) => {
    res.send('get all contacts')
})



// @route   POST  api/contacts
// @desc    Add new Contacts
// @access  Private
router.post('/', (req, res) => {
    res.send('Add contact')
})

// @route   PUT  api/contacts/:id
// @desc    Update Contacts
// @access  Private
router.put('/:id', (req, res) => {
    res.send('Update contact')
})


// @route   DELETE  api/contacts/:id
// @desc    DELETE Contacts
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete contact')
})



module.exports = router;