import { DesktopModel, UserModel } from "../models/index.js"

const controller = {
    createDesktopClient: (req, res) => {
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
    },
    getOnlineStatus: (req, res) => {},
}

export default controller
