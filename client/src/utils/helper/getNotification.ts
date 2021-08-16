import { notification } from "antd"
import { socket } from "../../core"

const getNotification = () => {
    socket.on("NOTIFICATION:UPDATE_DYNAMIC_DATA", (data) => {
        if (data.status !== 200) {
            notification.error({
                description: "Ошибка",
                message: data.data,
                duration: 3,
            })
        } else {
            notification.success({
                description: "Успешно",
                message: data.data,
                duration: 3,
            })
        }
    })
    socket.on("NOTIFICATION:UPDATE_STATIC_DATA", (data) => {
        if (data.status !== 200) {
            notification.error({
                description: "Ошибка",
                message: data.data,
                duration: 3,
            })
        } else {
            notification.success({
                description: "Успешно",
                message: data.data,
                duration: 3,
            })
        }
    })
}

export default getNotification
