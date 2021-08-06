import * as React from "react"
import { DesktopOutlined } from "@ant-design/icons"

import { Information } from "../../../../style"

interface IStatusContainerProps {
    status: {
        online: boolean
        hostname: string
    }
}

const Status: React.FC<IStatusContainerProps> = ({ status }) => {
    return (
        <Information.Status status={status.online}>
            <DesktopOutlined className="icon" />
            <div className="description">
                <div className="indicator" />
                <div>
                    {status.hostname}
                    <br />
                    {status.online ? "Онлайн" : "Оффлайн"}
                </div>
            </div>
        </Information.Status>
    )
}

export default Status
