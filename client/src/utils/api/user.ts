import { axios } from "../../core"

const api = {
    login: (data: any) => axios.post(`${process.env.SERVER_URL}/user/login`, data).then((res) => res.data),
    registration: (data: any) => axios.post(`${process.env.SERVER_URL}/user/registration`, data).then((res) => res.data),
}

export default api
