

import express from 'express';
import config from './configs/settings.json' with { type: "json" };
const app = express()
const defaultPort = config.port

import logging from './utils/logging.js'
import {setLoggingMode} from './utils/loggingmode.js'

import path from 'path';
import basicRoutes from './routes/basic/basic.js';
import inputRoutes from './routes/input.js';

const startServer = (customPort = undefined, debug = false, customRoutes = undefined) => {
    setLoggingMode(debug)

    app.use(express.static("public"));

    app.use('/basic', basicRoutes.basicRoutes);
    app.use('/input', inputRoutes.inputRoutes);

    if (customRoutes) {
        app.use('/custom', customRoutes);
    }

    const port = !!customPort ? customPort : defaultPort

    app.set('trust proxy', true)

    app.listen(port, async () => {
        logging(`Turning machine Api listening on ${port}`);
    })
}


export default {
    startServer,
    registerBasicCommand: basicRoutes.registerBasicCommand,
    registerInputCommand: inputRoutes.registerInputCommand,
    setLoggingMode: setLoggingMode
}