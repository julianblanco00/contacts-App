const { getKey, setKey } = require('../../lib/hashmap')

const getTableData = async ( req, res ) => {

    try{
        const contactsIds = await getContactsIds()
        const columns = await getColumns()
        const contacts = await getContacts();

        res.status( 200 ).json({
            contactsIds,
            columns,
            contacts
        })

    }catch( error ){
        return res.status( 400 ).json({ ok: false })
    }
}

const getContactsIds = async () => {
    const key = 'contactsIds'
    return snapshot = await getKey( key )
}

const getColumns = async () => {
    const key = 'tableColumns'
    const snapshot = await getKey( key )

    if( !snapshot ){
        const columns = ['image', 'name', 'birthday', 'address', 'company', 'personal phone', 'work phone', 'email', 'actions'];
        await setKey( key, columns )

        return columns;
    }

    return snapshot;
}

const getContacts = async () => {

    const key = 'contactsData'
    const result = {}

    const contacts = await getKey( key )

    if( !contacts ) return;

    contacts.forEach( ( contact ) => {
        result[ contact.id ] = contact.data;
    })

    return result;
} 

module.exports = { getTableData, getContactsIds, getColumns, getContacts }