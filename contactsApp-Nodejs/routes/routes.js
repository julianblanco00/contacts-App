const { Router } = require('express')

const { getTableData } = require('../controllers/contacts/getTableData')
const { addContact } = require('../controllers/contacts/addContact')
const { deleteContact } = require('../controllers/contacts/deleteContact')
const { updateContact } = require('../controllers/contacts/updateContact')
const { searchContact } = require('../controllers/contacts/searchContact')

const router = Router()

router.get( '/getTableData', getTableData )

router.post( '/addContact', addContact )

router.post( '/deleteContact', deleteContact )

router.put( '/updateContact', updateContact )

router.get( '/searchContact/emailOrPhone', searchContact )
router.get( '/searchContact/address', searchContact )
router.get( '/searchContact/name', searchContact )


module.exports = router;