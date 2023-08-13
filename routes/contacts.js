const express = require('express')
const {getAllContacts, deleteContact, addContact} = require('../controllers/contactControllers')
const authentificate = require('../middlewares/authentificate')
const isValidId = require ('../middlewares/validateId')
const {contactSchema} = require ("../schemas/contactSchema")
const {validateBody} = require ("../middlewares/validateBody")

const router = express.Router()

router.get('/', authentificate,  getAllContacts)

router.post('/', authentificate, validateBody(contactSchema), addContact)

router.delete('/:id', authentificate, isValidId, deleteContact)



module.exports = router
