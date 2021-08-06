import { notification } from "antd"
import { socket } from "../../core"

import { desktopApi } from "../../utils/api"

const actions = {
    createDesktop: (data: { user_id: string; desktop_name: string }) => (dispatch: (...args: any[]) => void) => {
        desktopApi.createDesktop(data).then((res) => {
            if (res.status !== 200) {
                notification.open({
                    type: "error",
                    message: "Ошибка",
                    description: res.data,
                    duration: 2,
                })
            } else {
                notification.open({
                    type: "success",
                    message: "Успешно",
                    description: "Вы подключились к пк",
                    duration: 2,
                })
                dispatch({
                    type: "DESKTOP:SET_DESKTOP",
                    payload: {
                        _id: res.data._id,
                        name: res.data.name,
                        online: res.data.online,
                    },
                })
                dispatch({
                    type: "USER:DESKTOP_REGISTRATION",
                    payload: {
                        isDesktopExist: true,
                    },
                })
            }
        })
    },
}

export default actions
