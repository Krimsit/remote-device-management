import * as React from "react"
import { useDispatch } from "react-redux"

import { userActions } from "../../../../redux/actions"

import { RegistrationForm } from "../../components"

import { Block } from "../../../../style"

interface IRegistrationContainerProps {
    history: any
}

const RegistrationContainer: React.FC<IRegistrationContainerProps> = ({ history }) => {
    const dispatch = useDispatch()

    const handleSubmit = (values: { username: string; email: string; password: string }) => {
        dispatch(userActions.registration(values, history))
    }

    return (
        <Block.AuthBlock>
            <RegistrationForm handleSubmit={handleSubmit} />
        </Block.AuthBlock>
    )
}

export default RegistrationContainer
