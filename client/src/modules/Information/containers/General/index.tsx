import * as React from "react"
import { connect } from "react-redux"
import { useState, useEffect } from "react"

import { socket } from "../../../../core"

import { General } from "../../components"

interface IGeneralContainerProps {
    _id: string
}

const GeneralContainer: React.FC<IGeneralContainerProps> = ({ _id }) => {
    const [information, setInformation] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        socket.emit("USER:GET_PC_INFORMATION", { client_id: _id }, (data: any) => {
            if (data.status === 200) {
                setInformation(data.data)
                setLoading(false)
            }
        })
    }, [_id])

    return <General data={information} loading={loading} />
}

const mapStateToProps = (
    state: any
): {
    _id: string
} => {
    return { _id: state.user._id }
}

export default connect(mapStateToProps)(GeneralContainer)
