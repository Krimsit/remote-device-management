import { IDesktopDynamicData, IDesktopStaticData, IDesktopData } from "./desktop"

export interface IDispatchDesktopData {
    type: string
    payload: IDesktopData
}

export interface IDispatchDesktopStaticData {
    type: string
    payload: IDesktopStaticData
}

export interface IDispatchDesktopDynamicData {
    type: string
    payload: IDesktopDynamicData
}
