export interface IDesktopData {
    _id?: string
    name?: string
    online: boolean
    hostname: string
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
}

export interface IDesktopDynamicData {
    memory: [
        {
            size: number
            bank: string
        }
    ]
    battery: {
        hasBattery: boolean
        isCharging: boolean
    }
    disks: [
        {
            fs: string
            type: string
            size: number
            used: number
            available: number
            use: number
        }
    ]
}
