const Hashmap = require('hashmap')

const hashmap = new Hashmap()

const getKey = ( key ) => {
    return new Promise( ( resolve, reject ) => {
        const value = hashmap.get( key )

        return resolve( value )
    })
}

const setKey = ( key, value ) => {
    return new Promise( ( resolve, reject ) => {
        const { _data } = hashmap.set( key, value ) 

        return resolve({
            data: _data,
            ok: true
        })
    })
}

const deleteKey = ( key ) => {
    return new Promise( ( resolve, reject ) => {
        hashmap.delete( key )

        return resolve({
            ok: true
        })
    })
}

module.exports = { getKey, setKey , deleteKey }