import { Dispatch, SetStateAction } from "react"
import { socket } from "../../core"

const getNotification = (setOpenNotification: Dispatch<SetStateAction<boolean>>, setNotificationData: Dispatch<SetStateAction<{ status: number; data: string }>>): void => {
    socket.on(`NOTIFICATION:UPDATE_${"STATIC_DATA" || "DYNAMIC_DATA" || "BATTERY_STATUS"}`, (data) => {
        setNotificationData(data)
        setOpenNotification(true)
    })
}

export default getNotification
