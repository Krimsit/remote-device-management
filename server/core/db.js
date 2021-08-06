import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const createDB = () => {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) {
            return console.error(err)
        } else {
            console.info("DB connected")
        }
    })
}

export default createDB
