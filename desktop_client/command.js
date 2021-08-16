import si from "systeminformation"

const command = {
    getStaticData: async () => {
        // const data = { model: null, baseboard: null, cpu: null, memory: null, graphics: null, os: null, disks: null }

        const data = {
            model: null,
            cpu: {
                model: null,
                cores: null,
                speed: null,
            },
            memory: null,
            graphics: [
                {
                    model: null,
                    vram: null,
                },
            ],
            os: {
                distro: null,
                arch: null,
                hostname: null,
            },
            disks: [
                {
                    model: null,
                    size: null,
                },
            ],
        }

        const system = await si.system()
        const cpu = await si.cpu()
        const mem = await si.mem()
        const graphics = await si.graphics()
        const osInfo = await si.osInfo()
        const diskLayout = await si.diskLayout()

        data.model = system.model
        data.cpu = { model: `${cpu.manufacturer} ${cpu.brand}`, cores: cpu.physicalCores, speed: `${cpu.speed} ГГц` }
        data.memory = mem.total
        data.graphics = graphics.controllers.map((controller) => {
            return { model: controller.model, vram: controller.vram }
        })
        data.os = { distro: osInfo.distro, arch: osInfo.arch, hostname: osInfo.hostname }
        data.disks = diskLayout.map((disk) => {
            return { model: disk.name, size: disk.size }
        })

        return data
    },
    getDynamicData: async () => {
        const data = {
            memory: null,
            battery: null,
            disks: null,
        }

        const memory = await si.memLayout()
        const battery = await si.battery()
        const disks = await si.fsSize()

        data.memory = memory
        data.battery = battery
        data.disks = disks

        return data
    },
}

export default command
