import { UserModel } from "../models/index.js"

const controller = {
    login: (req, res) => {
        const reqData = {
            username: req.body.username,
            password: req.body.password,
        }

        UserModel.findOne({ username: reqData.username }, (err, user) => {
            if (err || !user) {
                return res.json({
                    status: 404,
                    data: "Пользователь не найден",
                })
            }

            if (user.password !== reqData.password) {
                res.json({
                    status: 400,
                    data: "Неправильный пароль",
                })
            } else {
                res.json({
                    status: 200,
                    data: user,
                })
            }
        })
    },
    registration: (req, res) => {
        const reqData = {
            username: req.body.username,
            email: req.body.email,
            isDesktopExist: false,
            password: req.body.password,
        }

        const user = new UserModel(reqData)

        user.save()
            .then((user) => {
                res.json({
                    status: 200,
                    data: user,
                })
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    data: err,
                })
            })
    },
    delete: (req, res) => {
        const reqData = {
            username: req.body.username,
        }

        UserModel.findOneAndDelete({ username: reqData.username }, (err, user) => {
            if (err) {
                res.json({
                    status: 500,
                    data: err,
                })
            }

            res.json({
                status: 200,
                data: "Пользователь успешно удалён",
            })
        })
    },
}

export default controller
