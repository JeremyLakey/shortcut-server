

import express from 'express'
export const toldRoutes = express.Router()

// loads the piano notes game
toldRoutes.post('/', express.json(), async (req, res) => {
        
    console.log("I was told a secret:");
    console.log(req.body);

    res.status(200);
})