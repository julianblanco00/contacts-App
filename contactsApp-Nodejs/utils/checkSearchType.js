const { getContacts } = require('../controllers/contacts/getTableData')

const checkTypeOfSearch = async ( text, req, contactsIdsArr, newContactsObj ) => {

    const typeSearch = req.url.split('/')[2];
    const contacts = await getContacts();


    if( typeSearch.startsWith('name') ){
        for ( const id in contacts ) {
            if( contacts[ id ].name.toLowerCase().startsWith( text ) ){
                newContactsObj[ id ] = contacts[ id ]
                contactsIdsArr.push( id )
            }
        }
    }

    if ( typeSearch.startsWith('email') ){
        for ( const id in contacts ) {
            if( contacts[ id ].email.toLowerCase().startsWith( text ) || 
                contacts[ id ].personalPhone.toLowerCase().startsWith( text ) || 
                contacts[ id ].workPhone.toLowerCase().startsWith( text )){
                newContactsObj[ id ] = contacts[ id ]
                contactsIdsArr.push( id )
            }
        }

    }else{
        for ( const id in contacts ) {
            if( contacts[ id ].address.toLowerCase().startsWith( text ) ){
                newContactsObj[ id ] = contacts[ id ]
                contactsIdsArr.push( id )
            }
        }

    }
    
    return {
        newContactsObj, 
        contactsIdsArr
    }
}

module.exports = { checkTypeOfSearch }