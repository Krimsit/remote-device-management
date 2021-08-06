import { Server } from "socket.io"

import { UserModel, DesktopModel } from "../models/index.js"

const createSocket = (http) => {
    const io = new Server(http, { cors: { origin: "*" } })

    io.on("connection", (socket) => {
        socket.on("SERVER:JOIN_ROOM", (data) => {
            socket.join(`room_${data.client_id}`)
            if (data.pc && data.information) {
                DesktopModel.findOneAndUpdate({ user: data.client_id }, { online: true, information: data.information, hostname: data.information.os.hostname }, { upsert: false })
                    .populate(["user"])
                    .exec((err, desktop) => {
                        if (desktop) {
                            socket.broadcast.to(`room_${data.client_id}`).emit("USER:PC_STATUS", {
                                status: 200,
                                data: {
                                    online: desktop.online,
                                },
                            })
                        }
                    })
            }
        })
        socket.on("USER:GET_PC_INFORMATION", (data, callback) => {
            DesktopModel.findOne({ user: data.client_id }, (err, desktop) => {
                if (desktop) {
                    callback({ status: 200, data: desktop.information })
                }
            })
        })
        socket.on("USER:GET_PC_STATUS", (data, callback) => {
            DesktopModel.findOne({ user: data.client_id }, (err, desktop) => {
                if (desktop) {
                    callback({ status: 200, data: { online: desktop.online, hostname: desktop.hostname } })
                }
            })
        })
        socket.on("SERVER:DISCONNECTED_ROOM", (data) => {
            if (data.pc) {
                DesktopModel.findOneAndUpdate({ user: data.client_id }, { online: false }, { upsert: false })
                    .populate(["user"])
                    .exec((err, desktop) => {
                        if (desktop) {
                            socket.broadcast.to(`room_${data.client_id}`).emit("USER:PC_STATUS", {
                                status: 200,
                                data: {
                                    online: desktop.online,
                                },
                            })
                        }
                    })
            }
        })
    })
}

export default createSocket
