import * as React from "react"
import { connect } from "react-redux"
import { useState, useEffect } from "react"

import { IDesktopDynamicData } from "../../../../interface/desktop"

import { socket, axios } from "../../../../core"

import { DynamicData } from "../../components"

interface IDynamicDataContainerProps {
    _id: string
    dynamic_data: IDesktopDynamicData
}

const StaticDataContainer: React.FC<IDynamicDataContainerProps> = ({ _id, dynamic_data }) => {
    const [data, setData] = useState(dynamic_data)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setData(dynamic_data)
    }, [dynamic_data])

    const updateData = () => {
        axios.get(`${process.env.SERVER_URL}/desktop/updateDynamicData?client_id=${_id}`)
    }

    return <DynamicData data={data} loading={loading} updateData={updateData} />
}

const mapStateToProps = (
    state: any
): {
    _id: string
    dynamic_data: IDesktopDynamicData
} => {
    return { _id: state.user._id, dynamic_data: state.desktop.dynamic_data }
}

export default connect(mapStateToProps)(StaticDataContainer)
