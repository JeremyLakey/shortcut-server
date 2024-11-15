import express from 'express'
const inputRoutes = express.Router()
import logging from '../utils/logging.js';
import blockExternal from '../utils/blockexternal.js';

import path from 'path';
import { fileURLToPath } from 'url';

const inputRouteMap = {};
const inputConfigMap = {};
const inputRouteBeforeMap = {};


const registerInputCommand = (key, command, config = undefined, before = undefined) => {
    inputRouteMap[key.toLowerCase()] = command;
    if (config) {
        inputConfigMap[key.toLowerCase()] = config
    }
    if (before) {
        inputRouteBeforeMap[key.toLowerCase()] = before
    }
}

// loads the script for the input page
inputRoutes.get('/script', blockExternal, async (req, res) => {
    // show the page
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const _retfile = path.join(__dirname, '../html/input/input.js');

    
    res.status(200);
    res.sendFile(_retfile);
})

// loads the input page and triggers the before action
inputRoutes.get('/', blockExternal, async (req, res) => {
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
        
    // show the page
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const _retfile = path.join(__dirname, '../html/input/input.html');

    
    res.status(200);
    res.sendFile(_retfile);
})

// submits request body for a command
inputRoutes.post('/',[blockExternal, express.json()], async (req, res) => {
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

    const redirect = inputRouteMap[req.query.command](req.body);

    res.status(200);
    if (redirect && typeof redirect == "string") {
        res.send({url:redirect})
    }
    else {
        res.send(JSON.stringify({}))
    }
})

// grabs the config object for a command
inputRoutes.post('/config', [blockExternal, express.json()], async (req, res) => {
    if (!req.body.command) {
        logging("Bad Request: missing command body parameter");
        res.status(400);
        res.send({err:"Bad Request: missing command body parameter"});
        return;
    }
    if (!inputConfigMap[req.body.command]) {
        logging("Context not found: input command had no config object: " + req.body.command);
        res.status(404);
        res.send({});
        return;
    }

    logging(req.ip)
    logging(req.ips)

    logging(inputConfigMap[req.body.command])

    res.status(200);
    res.send(JSON.stringify(inputConfigMap[req.body.command]))
})

export default {
    inputRoutes,
    registerInputCommand
}