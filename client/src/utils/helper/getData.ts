import { socket } from "../../core"
import { desktopAction } from "../../redux/actions"
import { useDispatch } from "react-redux"

import { IDesktopStaticData, IDesktopDynamicData, IDesktopData } from "../../interface/desktop"

const useGetData = (_id: string): void => {
    const dispatch = useDispatch()

    setInterval(() => {
        socket.emit("USER:GET_PC_STATUS", { client_id: _id }, (data: { status: number; data: IDesktopData }) => {
            if (data.status === 200) {
                dispatch(desktopAction.getData(data.data))
            }
        })

        socket.emit("USER:GET_PC_STATIC_DATA", { client_id: _id }, (data: { status: number; data: IDesktopStaticData }) => {
            if (data.status === 200) {
                dispatch(desktopAction.getStaticData(data.data))
            }
        })

        socket.emit("USER:GET_PC_DYNAMIC_DATA", { client_id: _id }, (data: { status: number; data: IDesktopDynamicData }) => {
            if (data.status === 200) {
                dispatch(desktopAction.getDynamicData(data.data))
            }
        })
    }, 3000)
}

export default useGetData
