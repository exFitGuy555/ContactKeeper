//Loggin Existing User

const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const {
    check,
    validationResult
} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../midelware/auth')

const User = require('../models/User')


// @route   GET  api/auth
// @desc    get loggen in user
// @access  Private
router.get('/',auth, async (req, res) => {
    try{
    const user = await User.findById(req.user.id).select('-password')

      res.json(user)
    } catch (err) {
console.error(err.message);
res.status(500).send('Server Error')

    }
})

// @route   POST  api/auth
// @desc    AUTH user and getToken
// @access  Public
router.post('/', [
    check('email', 'enter a valid email').isEmail(),
    check('password', 'enter a valid password').exists(),
], async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
     return res.status(400).json({
         errors: errors.array()
     })
 }

 const {email, password} = req.body

 try {
  let user = await User.findOne({email})

  if(!user) {
      return res.status(400).json({msg: 'Invalid Credentials'})
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match){
      return res.status(400).json({msg: 'Invalid Credentials'})
  }

          const payload = {
              user: {
                  id: user.id
              }
          }


          jwt.sign(payload, config.get('jwt'), {
              expiresIn: 360000
          }, (err, token) => {
              if (err) throw err;
              res.json({
                  token
              })
          })

 } catch (err) {
     
console.error(err.message);
res.status(500).send('Server Error')


 }

 })

module.exports = router;