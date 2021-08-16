import { DesktopModel, UserModel } from "../models/index.js"

class controller {
    constructor({ io }) {
        this.io = io
    }

    createDesktopClient = (req, res) => {
        const postData = {
            user_id: req.body.user_id,
            desktop_name: req.body.desktop_name,
        }
        const desktop = new DesktopModel({
            name: postData.desktop_name,
            online: false,
            user: postData.user_id,
        })

        desktop
            .save()
            .then((obj) => {
                obj.populate(["user"], (err, desktop) => {
                    if (err) {
                        res.json({
                            status: 500,
                            data: err,
                        })
                    }

                    UserModel.findByIdAndUpdate(desktop.user, { isDesktopExist: true }, { upsert: false }, (err, user) => {
                        if (err || !user) {
                            console.log(err)
                        } else {
                            desktop.save((err, desktop) => {
                                if (err) {
                                    return res.json({
                                        status: 500,
                                        data: err,
                                    })
                                }

                                res.json({
                                    status: 200,
                                    data: desktop,
                                })
                            })
                        }
                    })
                })
            })
            .catch((err) => {
                console.error(err)
                res.json({
                    status: 500,
                    data: err,
                })
            })
    }
    updateStaticData = (req, res) => {
        this.io.sockets.to(`room_${req.query.client_id}`).emit("PC:GET_STATIC_DATA")
        res.end()
    }
    updateDynamicData = (req, res) => {
        this.io.sockets.to(`room_${req.body.client_id}`).emit("PC:GET_DYNAMIC_DATA")
        res.end()
    }
}

export default controller
