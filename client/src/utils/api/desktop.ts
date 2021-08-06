import { axios } from "../../core"

const api = {
    createDesktop: (data: any) => axios.post(`${process.env.SERVER_URL}/desktop/createDesktop`, data).then((res) => res.data),
}

export default api
