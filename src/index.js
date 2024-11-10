const express = require('express')
const config = require('./configs/settings.json')
const app = express()
const port = config.port

const basicRoutes = require('./routes/basic')

app.use('/basic', basicRoutes)


app.listen(port, async () => {
    console.log(`Turning machine Api listening on ${port}`)
})