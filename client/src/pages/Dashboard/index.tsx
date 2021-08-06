import * as React from "react"
import { connect } from "react-redux"
import { useDispatch } from "react-redux"
import { Button } from "antd"

import { desktopAction } from "../../redux/actions"

import { Information } from "../../modules"

interface IDashboardContainerProps {
    user: {
        _id: string
        username: string
        isDesktopExist: boolean
        email: string
    }
}

const Dashboard: React.FC<IDashboardContainerProps> = ({ user }) => {
    const dispatch = useDispatch()

    return (
        <div>
            {!user.isDesktopExist ? (
                <div>
                    <Button onClick={() => dispatch(desktopAction.createDesktop({ user_id: user._id, desktop_name: "Krimsit" }))}>Зарегистрировать компьютер</Button>
                </div>
            ) : (
                <div>
                    <Information />
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (
    state: any
): {
    user: {
        _id: string
        username: string
        isDesktopExist: boolean
        email: string
    }
} => {
    return { user: state.user }
}

export default connect(mapStateToProps)(Dashboard)
