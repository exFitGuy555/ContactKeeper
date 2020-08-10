//All routes Leading to Action on Contacts Crud

const express = require('express')
const router = express.Router();
const User = require('../models/User')
const Contact = require('../models/Contact')
const {
    check,
    validationResult
} = require('express-validator')
const auth = require('../midelware/auth')

// @route   GET  api/contacts
// @desc    get all user contacts
// @access  Public
router.get('/', auth , async (req, res) => {
    try{ //date -1 ==> most recent first
     const contacts = await Contact.find({user: req.user.id}).sort({date: -1})  
     res.json(contacts)


    } catch (err) {
console.Error(err.message)
res.status(500).send('Server Error')

    
}})




// @route   POST  api/contacts
// @desc    Add new Contacts
// @access  Private
router.post('/', [auth, [
    check('name', 'Please enter your name').not().isEmpty()
]], async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({
             errors: errors.array()
         })
     }

     const { name, phone, type, email} = req.body

     try{
      const newContact = new Contact({name, email, phone, type, user: req.user.id})

     const contact = await newContact.save()

     res.json(contact)


     }catch (err) {
console.error(err.message)
res.status(500).send('Server Error')

     }
})

// @route   PUT  api/contacts/:id
// @desc    Update Contacts
// @access  Private
router.put('/:id', auth, async  (req, res) => {
         const {
             name,
             phone,
             type,
             email
         } = req.body
   
         //Build a contact object
         const contactFields = {};
         if(name) contactFields.name = name;
         if (phone) contactFields.phone = phone;
         if (type) contactFields.type = type;
         if (email) contactFields.email = email;

         try{
             //params will allways come when we have /:XXX
          let contact = await Contact.findById(req.params.id)

          if(!contact){
              return res.status(404).json({msg: 'Contact not found'})}

              //Make sure user owns contact
              if(contact.user.toString() !== req.user.id) {
               return res.status(401).json({msg: 'Not outhorized'})
              }


              contact = await Contact.findByIdAndUpdate(req.params.id,
                {$set : contactFields},
                {new: true})

                res.json(contact)




         }catch (err) {

console.error(err.message)
res.status(500).send('Server Error')

         }
})


// @route   DELETE  api/contacts/:id
// @desc    DELETE Contacts
// @access  Private
router.delete('/:id', auth, async (req, res) => {
     try {
         let contact = await Contact.findById(req.params.id)

         if (!contact) {
             return res.status(404).json({
                 msg: 'Contact not found'
             })
         }

         //Make sure user owns contact
         if (contact.user.toString() !== req.user.id) {
             return res.status(401).json({
                 msg: 'Not outhorized'
             })
         }


        await Contact.findByIdAndRemove(req.params.id)

         res.json({msg: 'Contact Removed'})




     } catch (err) {

         console.error(err.message)
         res.status(500).send('Server Error')

     }
})



module.exports = router;