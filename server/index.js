import dotenv from "dotenv"
import express from "express"
import { Server as createHttp } from "http"

import { createRouter, createSocket, createDB } from "./core/index.js"

dotenv.config()

const app = express()
const http = createHttp(app)

createRouter(app)
createSocket(http)
createDB()

http.listen(process.env.PORT, function () {
    console.info("Server listening on: " + process.env.PORT)
})
