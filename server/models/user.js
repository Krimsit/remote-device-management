import mongoose from "mongoose"

const Schema = mongoose.Schema

const userScheme = new Schema({
    username: String,
    email: String,
    isDesktopExist: Boolean,
    password: String,
})

export default mongoose.model("User", userScheme)
