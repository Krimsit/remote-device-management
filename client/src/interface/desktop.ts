export interface IDesktopData {
    _id?: string
    name?: string
    online: boolean
    hostname: string
    battery: {
        hasBattery: boolean
        isCharging: boolean
        percent: number
    }
}

export interface IDesktopStaticData {
    model: string
    cpu: {
        model: string
        cores: number
        speed: string
    }
    memory: number
    graphics: [
        {
            model: string
            vram: string
        }
    ]
    os: {
        distro: string
        arch: string
    }
    disks: [
        {
            model: string
            size: number
        }
    ]
    dateUpdate: string
}

export interface IDesktopDynamicData {
    disks: [
        {
            fs: string
            type: string
            size: number
            used: number
            available: number
        }
    ]
    dateUpdate: string
}
