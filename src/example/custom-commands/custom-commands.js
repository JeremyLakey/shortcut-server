
import express from 'express'
const customRoutes = express.Router()

import {pianoRoutes} from "./pianoGame/piano.js"
import { toldRoutes } from './wasTold/wasTold.js'

export const getAllCustomCommands = () => {
    customRoutes.use("/piano", pianoRoutes);
    customRoutes.use("/told", toldRoutes);

    return customRoutes;
}