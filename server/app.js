const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const contactsRoutes = require('./routes/routes')

const app = express()

app.use( helmet() )
app.use( express.json() )
app.use( cors() );

app.use('/api', contactsRoutes)

const PORT = process.env.PORT || 3000

app.listen( PORT, () => {
    console.log('Server on port', PORT);
})

module.exports = app;