const { getKey, setKey } = require('../../lib/hashmap')

const updateContact = async ( req, res ) => {

    const { name, personalPhone } = req.body

    if( !name || !personalPhone ) return res.status( 400 ).json({ ok: false })

    try{
        const newData = { 
            id: req.body.id,
            data: {
                ...req.body
            }
        }
    
        delete newData.data['id']
    
        const keyData = 'contactsData'
    
        const data = await getKey( keyData )
    
        const id = newData.id
    
        let iContactToUpdate = data.findIndex( contact => contact.id === id )
    
        data.splice( iContactToUpdate, 1, newData )
        
        await setKey( keyData, data )
    
        res.status( 200 ).json({
            newData
        })

    }catch ( error ){
        return res.status( 400 ).json({ ok: false })
    }

}

module.exports = { updateContact }