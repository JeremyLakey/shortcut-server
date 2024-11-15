import express from 'express'
import logging from '../../utils/logging.js'
import blockExternal from '../../utils/blockexternal.js';
import basicResponses from './basicresponses.js';

const basicRoutes = express.Router()

const basicRouteMap = {}
const basicRouteConfigMap = {}

const registerBasicCommand = (key, command, config = undefined) => {
    basicRouteMap[key.toLowerCase()] = command;
    if (config) {
        console.log("Register config:" + key);
        basicRouteConfigMap[key.toLowerCase()] = config;
    }
}

// simple no input query command
basicRoutes.get('/', blockExternal, async (req, res) => {
    if (!req.query.command && basicRouteMap[req.query.command.toLowerCase()]) {
        
        logging("Bad Request: missing command query parameter");
        res.status(400)
        res.send({err:"Bad Request: missing command query parameter"})
        return
    }
    
    const command = req.query.command.toLowerCase()

    const config = basicRouteConfigMap[command]
    if (config) {
        logging("config:")
        logging(config)
        if (config.confirm && !req.query.confirm) {
            logging("Sending confirmation screen: " + config.confirm);
            res.status(200)
            res.send("<!DOCTYPE html><html><body><script>function c() {const conf=confirm(\"" + config.confirm + "\");if(conf){window.location.replace(\"" + req.originalUrl + "&confirm=true\");}else{history.back()}}; c();</script></body></html>")
            return
        }
    }

    logging("Basic with command param: " + req.query.command);

    const redirect = await basicRouteMap[command]();
    
    logging("redirect:");
    logging(redirect);

    res.status(200);
    res.send(basicResponses(redirect));
    // if (redirect && typeof redirect === "string") {
    //     res.send("<!DOCTYPE html><html><body><script>window.location.replace(" + redirect + ")</script></body></html>")
    // }
    // else if (Array.isArray(redirect) && redirect.length > 0 && typeof redirect[0] === "string") {

    // }
    // else if (typeof redirect === 'object') {
        
    // }
    // else {
    //     res.send("<!DOCTYPE html><html><body><script>history.back()</script></body></html>")
    // }
})

export default {
    basicRoutes,
    registerBasicCommand
}