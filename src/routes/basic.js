import express from 'express'
import logging from '../utils/logging.js'
import blockExternal from '../utils/blockexternal.js';

const basicRoutes = express.Router()

const basicRouteMap = {}

const registerBasicCommand = (key, command) => {
    basicRouteMap[key] = command
}

// simple no input query command
basicRoutes.get('/', blockExternal, async (req, res) => {
    if (!req.query.command) {
        
        logging("Bad Request: missing command query parameter");
        res.status(400)
        res.send({err:"Bad Request: missing command query parameter"})
        return
    }

    logging("Basic with command param: " + req.query.command);

    const redirect = basicRouteMap[req.query.command]()
        
    res.status(200)
    if (redirect && typeof redirect === "string") {
        res.send("<!DOCTYPE html><html><body><script>window.location.replace(" + redirect + ")</script></body></html>")
    }
    else if (Array.isArray(redirect) && redirect.length > 0 && typeof redirect[0] === "string") {

    }
    else if (typeof redirect === 'object') {
        
    }
    else {
        res.send("<!DOCTYPE html><html><body><script>history.back()</script></body></html>")
    }
})

export default {
    basicRoutes,
    registerBasicCommand
}