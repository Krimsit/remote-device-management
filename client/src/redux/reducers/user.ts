interface IUserInitialStateProps {
    isAuth: boolean
    _id: string
    username: string
    email: string
    isDesktopExist: boolean
}

interface IActionProps {
    type: string
    payload: any
}

// const initialState: IUserInitialStateProps = {
//     isAuth: false,
//     _id: null,
//     username: null,
//     email: null,
//     isDesktopExist: false,
// }

const initialState: IUserInitialStateProps = {
    isAuth: true,
    _id: "610539e8bc4b7e5390e1e4c1",
    username: "123",
    email: "123",
    isDesktopExist: true,
}

export default function user(state = initialState, action: IActionProps) {
    switch (action.type) {
        case "USER:SET_LOGIN":
            return {
                isAuth: action.payload.isAuth,
                _id: action.payload._id,
                username: action.payload.username,
                email: action.payload.email,
            }
        case "USER:DESKTOP_REGISTRATION":
            return {
                ...state,
                isDesktopExist: action.payload.isDesktopExist,
            }
        case "USER:SET_LOGOUT":
            return {
                isAuth: false,
                _id: null,
                username: null,
                email: null,
            }
        default:
            return state
    }
}
