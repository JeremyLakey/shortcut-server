import express from 'express'
export const pianoRoutes = express.Router()

import path from 'path';
import { fileURLToPath } from 'url';

// loads the piano notes game
pianoRoutes.get('/', async (req, res) => {
        
    // show the pag
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const _retfile = path.join(__dirname, './index.html');

    
    res.status(200);
    res.sendFile(_retfile);
})
