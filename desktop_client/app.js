import dotenv from "dotenv"
import { Server } from "http"
import io from "socket.io-client"
import keypress from "keypress"
import si from "systeminformation"
import iconv from "iconv-lite"

import command from "./command.js"

dotenv.config()

keypress(process.stdin)

const http = Server()
const server = io(process.env.SOCKET_SERVER_URL)

server.on("connect", async () => {
    server.emit("SERVER:JOIN_ROOM", { pc: true, client_id: process.env.CLIENT_ID, information: await command.getPCInfo() })
})

process.stdin.setEncoding("utf8")
process.stdin.on("keypress", (ch, key) => {
    if (key.name === "c") {
        server.emit("SERVER:DISCONNECTED_ROOM", { pc: true, client_id: process.env.CLIENT_ID })
        process.exit()
    }
})

http.listen(process.env.PORT, (err) => {
    if (err) {
        console.error(err)
    }

    console.info("Client_PC listening on " + process.env.PORT)
})
