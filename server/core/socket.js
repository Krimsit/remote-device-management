import { Server } from "socket.io"

import { DesktopModel } from "../models/index.js"

const createSocket = (http) => {
    const io = new Server(http, { cors: { origin: "*" } })

    io.on("connection", (socket) => {
        //Присоединение к комнате (В комнате клиент и пк)
        socket.on("SERVER:JOIN_ROOM", (data) => {
            socket.join(`room_${data.client_id}`)
            if (data.pc && data.static_data && data.dynamic_data) {
                DesktopModel.findOneAndUpdate(
                    { user: data.client_id },
                    { online: true, static_data: data.static_data, dynamic_data: data.dynamic_data, hostname: data.static_data.os.hostname },
                    { upsert: false }
                )
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

        //Получение информации о пк
        socket.on("USER:GET_PC_STATUS", (data, callback) => {
            DesktopModel.findOne({ user: data.client_id }, (err, desktop) => {
                if (desktop) {
                    callback({ status: 200, data: { online: desktop.online, hostname: desktop.hostname } })
                }
            })
        })
        socket.on("USER:GET_PC_STATIC_DATA", (data, callback) => {
            DesktopModel.findOne({ user: data.client_id }, (err, desktop) => {
                if (desktop) {
                    callback({ status: 200, data: desktop.static_data })
                }
            })
        })
        socket.on("USER:GET_PC_DYNAMIC_DATA", (data, callback) => {
            DesktopModel.findOne({ user: data.client_id }, (err, desktop) => {
                if (desktop) {
                    callback({ status: 200, data: desktop.dynamic_data })
                }
            })
        })

        //Обновление инфоромации
        socket.on("PC:DYNAMIC_DATA", (data) => {
            DesktopModel.findOneAndUpdate({ user: data.client_id }, { dynamic_data: data.dynamic_data }, { upset: false }, (err, desktop) => {
                if (err) {
                    socket.broadcast.to(`room_${data.client_id}`).emit("NOTIFICATION:UPDATE_DYNAMIC_DATA", { status: 500, data: "Непредвиденная ошибка сервера" })
                } else if (!desktop) {
                    socket.broadcast.to(`room_${data.client_id}`).emit("NOTIFICATION:UPDATE_DYNAMIC_DATA", { status: 404, data: "Компьютер не найден" })
                } else {
                    socket.broadcast.to(`room_${data.client_id}`).emit("NOTIFICATION:UPDATE_DYNAMIC_DATA", { status: 200, data: "Динамическая информация успешно обновлена" })
                }
            })
        })
        socket.on("PC:STATIC_DATA", (data) => {
            DesktopModel.findOneAndUpdate({ user: data.client_id }, { static_data: data.static_data }, { upset: false }, (err, desktop) => {
                if (err) {
                    socket.broadcast.to(`room_${data.client_id}`).emit("NOTIFICATION:UPDATE_STATIC_DATA", { status: 500, data: "Непредвиденная ошибка сервера" })
                } else if (!desktop) {
                    socket.broadcast.to(`room_${data.client_id}`).emit("NOTIFICATION:UPDATE_STATIC_DATA", { status: 404, data: "Компьютер не найден" })
                } else {
                    socket.broadcast.to(`room_${data.client_id}`).emit("NOTIFICATION:UPDATE_STATIC_DATA", { status: 200, data: "Статическая информация успешно обновлена" })
                }
            })
        })

        //Отсоединение от комнаты
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

    return io
}

export default createSocket
