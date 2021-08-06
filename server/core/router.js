import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import { UserController, DesktopController } from "../controllers/index.js"

const createRouter = (app) => {
    app.use(bodyParser.json())
    app.use(cors())

    app.get("/isServerLive", (req, res) => {
        res.send("I`m ALIVE!")
    })

    app.post("/user/login", UserController.login)
    app.post("/user/registration", UserController.registration)

    app.post("/desktop/createDesktop", DesktopController.createDesktopClient)
}

export default createRouter
