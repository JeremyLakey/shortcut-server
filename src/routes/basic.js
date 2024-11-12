const express = require('express')
const basicRoutes = express.Router()
const logging = require('../utils/logging')

const basicRouteMap = {}

registerBasicCommand = (key, command) => {
    basicRouteMap[key] = command
}

// simple no input query command
basicRoutes.get('/', async (req, res) => {
    if (!req.query.command) {
        
        logging("Bad Request: missing command query parameter");
        res.status(400)
        res.send({err:"Bad Request: missing command query parameter"})
        return
    }

    logging("Basic with command param: " + req.query.command);

    const redirect = basicRouteMap[req.query.command]()
        
    res.status(200)
    if (redirect && typeof redirect == "string") {
        res.send("<!DOCTYPE html><html><body><script>window.location.replace(" + redirect + ")</script></body></html>")
    }
    else {
        res.send("<!DOCTYPE html><html><body><script>history.back()</script></body></html>")
    }
})

module.exports = {
    basicRoutes,
    registerBasicCommand
}