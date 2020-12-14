const { getKey, setKey , deleteKey } = require('../../lib/hashmap')

const deleteContact =  async( req, res ) => {
    
    try{
        const idContactToDelete = req.body.id
        const keyIds = 'contactsIds'
        const keyData = 'contactsData'

        const data = await getKey( keyData )
        const ids = await getKey( keyIds )

        const iData = data.findIndex( contact => contact.id === idContactToDelete )
        const iIds = ids.indexOf( idContactToDelete )

        if( iData === -1 || iIds === -1 ) return res.status( 400 ).json({ ok: false })

        data.splice( iData, 1 );
        ids.splice( iIds, 1 )

        if( !data.length || !ids.length ){
            deleteKey( keyIds )
            deleteKey( keyData )

        }else{
            setKey( keyIds, ids )
            setKey( keyData, data )    
        }

        res.status( 200 ).json({
            id: idContactToDelete,
            ok: true
        })

    } catch( error ){
        if( error ) return res.status( 400 ).json({ ok: false })
    }
}

module.exports = { deleteContact }