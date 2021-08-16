import { notification } from "antd"
import { Dispatch } from "react"
import { Statement } from "typescript"
import { socket } from "../../core"

import { IDesktopData, IDesktopDynamicData, IDesktopStaticData } from "../../interface/desktop"
import { IDispatchDesktopDynamicData, IDispatchDesktopStaticData, IDispatchDesktopData } from "../../interface/dispatch"

import { desktopApi } from "../../utils/api"
import { getChange } from "../../utils/helper"

const actions = {
    createDesktop:
        (data: { user_id: string; desktop_name: string }) =>
        (dispatch: Dispatch<IDispatchDesktopData>): void => {
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
                            hostname: res.data.hostname,
                        },
                    })
                    // dispatch({
                    //     type: "USER:DESKTOP_REGISTRATION",
                    //     payload: {
                    //         isDesktopExist: true,
                    //     },
                    // })
                }
            })
        },
    getData:
        (data: IDesktopData) =>
        (dispatch: Dispatch<IDispatchDesktopData>, getState: any): void => {
            const old_data: IDesktopData = {
                online: getState().desktop.online,
                hostname: getState().desktop.hostname,
            }

            if (getChange(old_data, data)) {
                dispatch({
                    type: "DESKTOP:SET_DATA",
                    payload: data,
                })
            }
        },
    getStaticData:
        (data: IDesktopStaticData) =>
        (dispatch: Dispatch<IDispatchDesktopStaticData>, getState: any): void => {
            const old_data: IDesktopData = getState().desktop.static_data

            if (getChange(old_data, data)) {
                dispatch({
                    type: "DESKTOP:SET_STATIC_DATA",
                    payload: data,
                })
            }
        },
    getDynamicData:
        (data: IDesktopDynamicData) =>
        (dispatch: Dispatch<IDispatchDesktopDynamicData>, getState: any): void => {
            const old_data: IDesktopData = getState().desktop.dynamic_data

            if (getChange(old_data, data)) {
                dispatch({
                    type: "DESKTOP:SET_DYNAMIC_DATA",
                    payload: data,
                })
            }
        },
}

export default actions
