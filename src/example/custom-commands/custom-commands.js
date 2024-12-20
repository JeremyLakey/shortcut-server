
import express from 'express'
const customRoutes = express.Router()

import {pianoRoutes} from "./pianoGame/piano.js"

export const getAllCustomCommands = () => {
    customRoutes.use("/piano", pianoRoutes)

    return customRoutes
}