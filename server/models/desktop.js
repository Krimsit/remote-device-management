import mongoose from "mongoose"

const Schema = mongoose.Schema

const desktopScheme = new Schema({
    name: String,
    online: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    hostname: String,
    information: {
        model: String,
        baseboard: String,
        cpu: {
            model: String,
            cores: Number,
            speed: String,
        },
        memory: Number,
        graphics: [
            {
                model: String,
                vram: Number,
            },
        ],
        os: {
            distro: String,
            arch: String,
        },
        disks: [
            {
                model: String,
                size: Number,
            },
        ],
    },
})

export default mongoose.model("Desktop", desktopScheme)
