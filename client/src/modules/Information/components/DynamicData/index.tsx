import * as React from "react"
import Moment from "react-moment"
import { Update } from "@material-ui/icons"
import { Typography, Tooltip, Skeleton } from "antd"
import { Pie } from "@nivo/pie"

import { IDesktopDynamicData } from "../../../../interface/desktop"

import { Information, Button, Components } from "../../../../style"

const { Paragraph } = Typography

interface IDynamicDataComponentProps {
    loading: boolean
    updateData: any
    data: IDesktopDynamicData
}

const CenteredMetric: React.FC<{ dataWithArc: any; centerX: number; centerY: number }> = ({ dataWithArc, centerX, centerY }) => {
    return (
        <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
                fontSize: "52px",
                fontWeight: 600,
            }}
        >
            {dataWithArc.id}
        </text>
    )
}

const DynamicDataComponent: React.FC<IDynamicDataComponentProps> = ({ loading, data, updateData }) => {
    return (
        <Information.DynamicData>
            {!loading && data ? (
                <div className="card__container">
                    {data.disks.map((disk, key) => (
                        <Components.ChartCard key={key}>
                            <h3 className="title">Диск {disk.fs}</h3>
                            <div className="content">
                                <p>Всего места: {disk.size}</p>
                                <Pie
                                    width={600}
                                    height={500}
                                    data={[
                                        {
                                            id: "Занято",
                                            label: "Занято",
                                            value: disk.used,
                                            color: "hsl(215, 70%, 50%)",
                                        },
                                        {
                                            id: "Свободно",
                                            label: "Свободно",
                                            value: disk.available,
                                            color: "hsl(254, 70%, 50%)",
                                        },
                                    ]}
                                    margin={{ top: 0, right: 200, bottom: 80, left: 200 }}
                                    innerRadius={0.6}
                                    padAngle={0.5}
                                    cornerRadius={5}
                                    arcLinkLabel={(d) => `${d.id}: ${d.value}`}
                                    arcLinkLabelsColor={{
                                        from: "color",
                                    }}
                                    enableArcLabels={false}
                                    animate={true}
                                    activeOuterRadiusOffset={8}
                                    legends={[
                                        {
                                            anchor: "bottom" as const,
                                            direction: "row" as const,
                                            toggleSerie: true,
                                            translateY: 56,
                                            itemWidth: 100,
                                            itemHeight: 18,
                                            itemTextColor: "#999",
                                            symbolSize: 18,
                                            symbolShape: "circle" as const,
                                            effects: [
                                                {
                                                    on: "hover" as const,
                                                    style: {
                                                        itemTextColor: "#000",
                                                    },
                                                },
                                            ],
                                        },
                                    ]}
                                />
                            </div>
                            <div className="legends"></div>
                        </Components.ChartCard>
                    ))}
                    <Tooltip title="Обновить" className="card__container__btn">
                        <Moment format="YYYY-MM-DD hh:mm:ss">{data.dateUpdate}</Moment>
                        <Button.Update type="text" onClick={updateData}>
                            <Update />
                        </Button.Update>
                    </Tooltip>
                </div>
            ) : (
                <Skeleton active />
            )}
        </Information.DynamicData>
    )
}

export default DynamicDataComponent
