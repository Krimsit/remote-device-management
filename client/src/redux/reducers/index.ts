import { combineReducers } from "redux"

const reducers = ["user", "desktop"]

export default combineReducers(
    reducers.reduce((initial: any, name) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        initial[name] = require(`./${name}`).default
        return initial
    }, {})
)
