import * as React from "react"
import { useDispatch } from "react-redux"

import { userActions } from "../../../../redux/actions"

import { LoginForm } from "../../components"

import { Block } from "../../../../style"

interface ILoginContainerProps {
    history: any
}

const LoginContainer: React.FC<ILoginContainerProps> = ({ history }) => {
    const dispatch = useDispatch()

    const handleSubmit = (values: { username: string; password: string }) => {
        dispatch(userActions.login(values, history))
    }
    return (
        <Block.AuthBlock>
            <LoginForm handleSubmit={handleSubmit} />
        </Block.AuthBlock>
    )
}

export default LoginContainer
