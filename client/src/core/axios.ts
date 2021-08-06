import axios from "axios"

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS"

export default axios
