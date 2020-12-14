const { v4: uuidv4 } = require('uuid');
const { setKey, getKey } = require('../../lib/hashmap')

const addContact = async ( req, res ) => {

    const { name, personalPhone } = req.body
    if( !name || !personalPhone ) return res.status( 400 ).json({ ok: false })

    const keyData = 'contactsData'
    const keyIds = 'contactsIds'

    const data = { ...req.body }
    const id = uuidv4()

    const newContact = { 
        id,
        data
    }

    let arrData = []
    let arrIds = []

    const contacts = await getKey( keyData )
    const ids = await getKey( keyIds )

    if( contacts ) arrData = contacts
    if( ids ) arrIds = ids
    
    arrData.push( newContact )
    arrIds.push( id )

    const idsSaaved = await setKey( keyIds, arrIds )
    const dataSaved = await setKey( keyData, arrData )

    if( !dataSaved.ok || !idsSaaved.ok ) return res.status( 400 ).json({ ok: false })

    res.status( 200 ).json({
        newContact,
        ok: true
    })
}

module.exports = { addContact }