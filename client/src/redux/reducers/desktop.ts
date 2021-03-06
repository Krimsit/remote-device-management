import { IDesktopData, IDesktopDynamicData, IDesktopStaticData } from "../../interface/desktop"
interface IDesktopInitialStateProps {
    _id?: string
    name?: string
    hostname?: string
    online?: boolean
    battery?: {
        hasBattery: boolean
        isCharging: boolean
        percent: number
    }
    static_data?: IDesktopStaticData
    dynamic_data?: IDesktopDynamicData
}

interface IActionProps {
    type: string
    payload: IDesktopData & IDesktopDynamicData & IDesktopStaticData
}

const initialState: IDesktopInitialStateProps = {
    _id: null,
    name: null,
    online: false,
    battery: {
        hasBattery: false,
        isCharging: false,
        percent: 0,
    },
    static_data: {
        model: null,
        cpu: {
            model: null,
            cores: 0,
            speed: null,
        },
        memory: 0,
        graphics: [
            {
                model: null,
                vram: null,
            },
        ],
        os: {
            distro: null,
            arch: null,
        },
        disks: [
            {
                model: null,
                size: 0,
            },
        ],
        dateUpdate: null,
    },
    dynamic_data: {
        disks: [
            {
                fs: null,
                type: null,
                size: 0,
                used: 0,
                available: 0,
            },
        ],
        dateUpdate: null,
    },
}

export default function user(state = initialState, action: IActionProps): IDesktopInitialStateProps {
    switch (action.type) {
        case "DESKTOP:SET_DESKTOP":
            return {
                _id: action.payload._id,
                name: action.payload.name,
                online: action.payload.online,
                battery: action.payload.battery,
            }
        case "DESKTOP:SET_DATA":
            return {
                ...state,
                hostname: action.payload.hostname,
                online: action.payload.online,
                battery: action.payload.battery,
            }
        case "DESKTOP:SET_STATIC_DATA":
            return {
                ...state,
                static_data: action.payload,
            }
        case "DESKTOP:SET_DYNAMIC_DATA":
            return {
                ...state,
                dynamic_data: action.payload,
            }
        default:
            return state
    }
}
