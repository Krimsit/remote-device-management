import si from "systeminformation"

const command = {
    getPCInfo: async () => {
        const pc_info = { model: null, baseboard: null, cpu: null, memory: null, graphics: null, os: null, disks: null }

        const system = await si.system()
        const baseboard = await si.baseboard()
        const cpu = await si.cpu()
        const mem = await si.mem()
        const graphics = await si.graphics()
        const osInfo = await si.osInfo()
        const diskLayout = await si.diskLayout()
        pc_info.model = system.model
        pc_info.baseboard = `${baseboard.manufacturer}${baseboard.model}`
        pc_info.cpu = { model: `${cpu.manufacturer} ${cpu.brand}`, cores: cpu.physicalCores, speed: `${cpu.speed} ГГц` }
        pc_info.memory = mem.total
        pc_info.graphics = graphics.controllers.map((controller) => {
            return { model: controller.model, vram: controller.vram }
        })
        pc_info.os = { distro: osInfo.distro, arch: osInfo.arch, hostname: osInfo.hostname }
        pc_info.disks = diskLayout.map((disk) => {
            return { model: disk.name, size: disk.size }
        })

        return pc_info
    },
}

export default command
