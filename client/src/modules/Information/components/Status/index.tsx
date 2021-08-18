import * as React from "react"
import { Progress } from "antd"
import { FlashOn, DesktopWindows } from "@material-ui/icons"

import { Information } from "../../../../style"

interface IStatusContainerProps {
    status: {
        online: boolean
        hostname: string
        battery: {
            hasBattery: boolean
            isCharging: boolean
            percent: number
        }
    }
}

const Status: React.FC<IStatusContainerProps> = ({ status }) => {
    return (
        <Information.Status status={status.online}>
            <DesktopWindows className="icon" />
            <div className="description">
                <div>
                    {status.hostname}
                    <br />
                    {status.online ? "Онлайн" : "Оффлайн"}
                </div>
                <div className="indicator" />
                {status.battery.hasBattery && (
                    <div className="battery">
                        <Progress
                            percent={status.battery.percent}
                            strokeColor={status.battery.percent >= 50 ? "#52C41A" : status.battery.percent >= 20 ? "#FAAD14" : "#FF4D4F"}
                            format={(percent) => `${percent}%`}
                            status={status.battery.isCharging ? "active" : "normal"}
                        />
                        {status.battery.isCharging && <FlashOn />}
                    </div>
                )}
            </div>
        </Information.Status>
    )
}

export default Status
