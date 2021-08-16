import * as React from "react"
import { useState, useEffect } from "react"
import { connect } from "react-redux"

import { IDesktopData } from "../../../../interface/desktop"

import { Status } from "../../components"

interface IStatusContainerProps {
    desktop: IDesktopData
}

const StatusContainer: React.FC<IStatusContainerProps> = ({ desktop }) => {
    const [status, setStatus] = useState({
        online: desktop.online,
        hostname: desktop.hostname,
    })

    useEffect(() => {
        setStatus({
            online: desktop.online,
            hostname: desktop.hostname,
        })
    }, [status])

    return <Status status={status} />
}

const mapStateToProps = (
    state: any
): {
    desktop: IDesktopData
} => {
    return {
        desktop: {
            online: state.desktop.online,
            hostname: state.desktop.hostname,
        },
    }
}

export default connect(mapStateToProps)(StatusContainer)
