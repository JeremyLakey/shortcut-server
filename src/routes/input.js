const express = require('express')
const inputRoutes = express.Router()
const logging = require('../utils/logging');
const { redirect } = require('express/lib/response');

const inputRouteMap = {};
const inputRouteBeforeMap = {};

registerInputCommand = (key, command, before = undefined) => {
    inputRouteMap[key] = command;
    if (before) {
        inputRouteBeforeMap[key] = before
    }
}

// simple no input query command
inputRoutes.get('/', async (req, res) => {
    if (!req.query.command) {
        
        logging("Bad Request: missing command query parameter");
        res.status(400);
        res.send({err:"Bad Request: missing command query parameter"});
        return;
    }
    if (!inputRouteMap[req.query.command]) {
        logging("Bad Request: input command not registered: " + req.query.command);
        res.status(400);
        res.send({err:"Bad Request: input command not registered: " + req.query.command});
        return;
    }

    logging("Basic with command param: " + req.query.command);
    
    if (inputRouteBeforeMap[req.query.command]) {
        inputRouteBeforeMap[req.query.command]()
    }
        
    res.status(200);
    res.send("<!DOCTYPE html><html><body>FINISH INPUT routes</body></html>");
})

inputRoutes.post('/', express.json(), async (req, res) => {
    if (!req.query.command) {
        logging("Bad Request: missing command query parameter");
        res.status(400);
        res.send({err:"Bad Request: missing command query parameter"});
        return;
    }
    if (!inputRouteMap[req.query.command]) {
        logging("Bad Request: input command not registered: " + req.query.command);
        res.status(400);
        res.send({err:"Bad Request: input command not registered: " + req.query.command});
        return;
    }

    redirect = inputRouteMap[req.query.command](req.body.text);

    res.status(200);
    if (redirect && typeof redirect == "string") {
        res.send({url:redirect})
    }
    else {
        res.send({})
    }
})

module.exports = {
    inputRoutes,
    registerInputCommand
}