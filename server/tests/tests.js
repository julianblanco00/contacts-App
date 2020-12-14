const request = require('supertest')
const axios = require('axios')
const app = require('../app')

const contactData = {
    name: "Julian",
    personalPhone: "111222333"
}

const generateContactId = () => {

    return new Promise( async( resolve, reject ) => {
        const { data } = await axios.post( 'http://localhost:3000/api/addContact', contactData )	
        return resolve( data.newContact )
    })
}

describe('GET /api/getTableData', () => {
    it('should respond with a json and status 200', done => {

        request(app)
            .get('/api/getTableData')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end( err => {
                if( err ) return done( err )
                done();
            })

    })
})

describe('POST /api/addContact', () => {
    it('should respond with a json and status 200', done => {

        const data = {
            name: "Julian",
            personalPhone: "111222333"
        }

        request(app)
            .post('/api/addContact')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end( err => {
                if( err ) return done( err )
                done();
            })

    })

    it('should respond with status 400 if some required data is missing', done => {

        const data = {
            name: "Julian",
            bithday: "26/05/00"
        }

        request(app)
            .post('/api/addContact')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end( err => {
                if( err ) return done( err )
                done();
            })

    })
})

describe('POST /api/deleteContact', () => {
    it('should respond with a json and status 200', (done) => {

        ( async () => {
            
            const contact = await generateContactId()
        
            const contactObj = {
                id: contact.id    
            }

            request(app)
                .post('/api/deleteContact')
                .send( contactObj )
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end( err => {
                    if( err ) return done( err )
                    done();
                })

        })()

    })

    it('should respond withstatus 400 if contact id is wrong', (done) => {

        ( async () => {
            const contactObj = {}
            const contact = await generateContactId()
            
            contactObj[ '123asd123asd' ] = {
                ...contact.data
            }

            request(app)
                .post('/api/deleteContact')
                .send( contactObj )
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .end( err => {
                    if( err ) return done( err )
                    done();
                })

        })()

    })
})

describe('PUT /api/updateContact', () => {
    it('should respond with a json and status 200', done => {

        ( async () => {

            const contact = await generateContactId()

            const newData = {
                name: "Julian",
                personalPhone: "111222333",
                id: contact.id
            }

            request(app)
                .put('/api/updateContact')
                .send(newData)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end( err => {
                    if( err ) return done( err )
                    done();
                })

        })();
        
    })

    it('should respond with status 400 if some required data is missing', done => {

        ( async () => {

            const contact = await generateContactId()

            const data = {
                name: "Julian",
                bithday: "26/05/00",
                id: contact.id
            }

            request(app)
                .put('/api/updateContact')
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .end( err => {
                    if( err ) return done( err )
                    done();
                })

        })()

    })
})

describe('GET /searchContact', () => {
    it('/emailOrPhone?text=, should respond with a json and status 200', done => {

        request(app)
            .get('/api/searchContact/emailOrPhone?text=julian@blanco.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end( err => {
                if( err ) return done( err )
                done();
            })

    })

    it('/address?text=, should respond with a json and status 200', done => {

        request(app)
            .get('/api/searchContact/address?text=4th street')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end( err => {
                if( err ) return done( err )
                done();
            })

    })

    it('/name?text=, should respond with a json and status 200', done => {

        request(app)
            .get('/api/searchContact/name?text=julian')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end( err => {
                if( err ) return done( err )
                done();
            })

    })
})