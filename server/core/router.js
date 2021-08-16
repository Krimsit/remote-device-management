import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import { UserController, DesktopController } from "../controllers/index.js"

const createRouter = (app, io) => {
    app.set("socket", io)
    app.use(bodyParser.json())
    app.use(cors())

    app.get("/isServerLive", (req, res) => {
        res.send("I`m ALIVE!")
    })

    app.post("/user/login", UserController.login)
    app.post("/user/registration", UserController.registration)

    app.post("/desktop/createDesktop", new DesktopController({ io }).createDesktopClient)
    app.get("/desktop/updateStaticData", new DesktopController({ io }).updateStaticData)
    app.get("/desktop/updateDynamicData", new DesktopController({ io }).updateDynamicData)
}

export default createRouter
