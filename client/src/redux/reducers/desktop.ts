interface IDesktopInitialStateProps {
    _id: string
    name: string
    online: boolean
}

interface IActionProps {
    type: string
    payload: any
}

const initialState: IDesktopInitialStateProps = {
    _id: null,
    name: null,
    online: false,
}

export default function user(state = initialState, action: IActionProps) {
    switch (action.type) {
        case "DESKTOP:SET_DESKTOP":
            return {
                _id: action.payload._id,
                name: action.payload.name,
                online: action.payload.online,
            }
        default:
            return state
    }
}
