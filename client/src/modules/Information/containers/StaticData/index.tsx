import * as React from "react"
import { connect } from "react-redux"
import { useState, useEffect } from "react"

import { IDesktopStaticData } from "../../../../interface/desktop"

import { socket, axios } from "../../../../core"

import { StaticData } from "../../components"

interface IStaticDataContainerProps {
    _id: string
    static_data: IDesktopStaticData
}

const StaticDataContainer: React.FC<IStaticDataContainerProps> = ({ _id, static_data }) => {
    const [data, setData] = useState(static_data)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setData(static_data)
    }, [static_data])

    const updateData = () => {
        axios.get(`${process.env.SERVER_URL}/desktop/updateStaticData?client_id=${_id}`)
    }

    return <StaticData data={data} loading={loading} updateData={updateData} />
}

const mapStateToProps = (
    state: any
): {
    _id: string
    static_data: IDesktopStaticData
} => {
    return { _id: state.user._id, static_data: state.desktop.static_data }
}

export default connect(mapStateToProps)(StaticDataContainer)
