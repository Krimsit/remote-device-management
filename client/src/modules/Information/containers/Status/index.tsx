import * as React from "react"
import { useState, useEffect } from "react"
import { connect } from "react-redux"

import { socket } from "../../../../core"

import { Status } from "../../components"

interface IStatusContainerProps {
    _id: string
}

const StatusContainer: React.FC<IStatusContainerProps> = ({ _id }) => {
    const [status, setStatus] = useState({
        online: false,
        hostname: null,
    })

    useEffect(() => {
        setInterval(() => {
            socket.emit("USER:GET_PC_STATUS", { client_id: _id }, (data: any) => {
                if (data.status === 200) {
                    setStatus({
                        online: data.data.online,
                        hostname: data.data.hostname,
                    })
                }
            })
        }, 1000)
    }, [])

    return <Status status={status} />
}

const mapStateToProps = (
    state: any
): {
    _id: string
} => {
    return { _id: state.user._id }
}

export default connect(mapStateToProps)(StatusContainer)
