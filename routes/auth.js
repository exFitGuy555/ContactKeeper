const express = require('express')
const router = express.Router();


// @route   GET  api/auth
// @desc    get loggen in user
// @access  Private
router.get('/', (req, res) => {
    res.send('Get logged in user')
})

// @route   POST  api/auth
// @desc    AUTH user and getToken
// @access  Public
router.post('/', (req, res) => {
    res.send('Log in User')
})

module.exports = router;