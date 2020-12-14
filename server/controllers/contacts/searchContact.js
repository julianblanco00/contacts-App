const { getColumns, getContacts, getContactsIds } = require('./getTableData')
const { checkTypeOfSearch } = require('../../utils/checkSearchType')

const searchContact = async ( req, res ) => {

    let idsArr = []
    let contactsObj = {}

    const { query: text } = req.query
    const columns = await getColumns()

    if( !text ) {
        const ids = await getContactsIds()
        const contacts = await getContacts();

        return res.status( 200 ).json({
            contacts,
            columns, 
            contactsIds: ids
        })
    };

    let { contactsIdsArr, newContactsObj } = await checkTypeOfSearch( text, req, idsArr, contactsObj ) 
    
    if( !Object.keys( newContactsObj )[0] ) newContactsObj = null

    res.status( 200 ).json({
        contacts: newContactsObj,
        columns, 
        contactsIds: contactsIdsArr
    })
}


module.exports = { searchContact }