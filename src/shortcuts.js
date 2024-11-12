

const express = require('express')
const config = require('./configs/settings.json')
const app = express()
const defaultPort = config.port

const logging = require('./utils/logging')
const loggingMode = require('./utils/loggingmode')

const basicRoutes = require('./routes/basic');
const inputRoutes = require('./routes/input');

const startServer = (customPort = undefined, debug = false, customRoutes = undefined) => {
    loggingMode.setLoggingMode(debug)

    app.use('/basic', basicRoutes.basicRoutes);
    app.use('/input', inputRoutes.inputRoutes);

    if (customRoutes) {
        app.use('/custom', customRoutes);
    }

    const port = !!customPort ? customPort : defaultPort

    app.listen(port, async () => {
        logging(`Turning machine Api listening on ${port}`);
    })
}



export default {
    startServer,
    registerBasicCommand: basicRoutes.registerBasicCommand,
    registerInputCommand: inputRoutes.registerInputCommand,
    setLoggingMode: loggingMode.setLoggingMode
}