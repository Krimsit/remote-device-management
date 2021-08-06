import { notification } from "antd"
import { socket } from "../../core"

import { userApi } from "../../utils/api"

const actions = {
    login: (data: { username: string; password: string }, history: any) => (dispatch: (...args: any[]) => void) => {
        userApi.login(data).then((res) => {
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
                    description: "Вы успешно авторизовались",
                    duration: 2,
                })
                dispatch({
                    type: "USER:SET_LOGIN",
                    payload: {
                        isAuth: true,
                        _id: res.data._id,
                        username: res.data.username,
                        email: res.data.email,
                    },
                })
                dispatch({
                    type: "USER:DESKTOP_REGISTRATION",
                    payload: {
                        isDesktopExist: res.data.isDesktopExist,
                    },
                })
                socket.emit("SERVER:JOIN_ROOM", { user: true, client_id: res.data._id })
                history.push("/dashboard")
            }
        })
    },
    registration: (data: { username: string; email: string; password: string }, history: any) => (dispatch: (...args: any[]) => void) => {
        userApi.registration(data).then((res) => {
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
                    description: "Вы успешно зарегистрировались",
                    duration: 2,
                })
                dispatch({
                    type: "USER:SET_LOGIN",
                    payload: {
                        isAuth: true,
                        _id: res.data._id,
                        username: res.data.username,
                        email: res.data.email,
                    },
                })
                history.push("/dashboard")
            }
        })
    },
}

export default actions
