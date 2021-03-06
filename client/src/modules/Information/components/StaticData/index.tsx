import * as React from "react"
import Moment from "react-moment"
import { Update } from "@material-ui/icons"
import { Typography, Tooltip, Skeleton } from "antd"

import { IDesktopStaticData } from "../../../../interface/desktop"

import { Information, Button, Components } from "../../../../style"

const { Paragraph } = Typography

interface IStaticDataComponentProps {
    loading: boolean
    updateData: any
    data: IDesktopStaticData
}

const StaticDataComponent: React.FC<IStaticDataComponentProps> = ({ loading, data, updateData }) => {
    return (
        <Information.StaticData>
            {!loading && data ? (
                <div className="card__container">
                    <Components.Card className="card__container__item">
                        <h3>Модель</h3>
                        {data.model}
                    </Components.Card>
                    <Components.Card className="card__container__item">
                        <h3>Процессор</h3>

                        <Paragraph>
                            <span>Модель: {data.cpu.model}</span>
                            <br />
                            <span>Кол-во ядер: {data.cpu.cores}</span>
                            <br />
                            <span>Частота: {data.cpu.speed}</span>
                        </Paragraph>
                    </Components.Card>
                    <Components.Card className="card__container__item">
                        <h3>Оперативная память</h3>
                        {data.memory}
                    </Components.Card>
                    <Components.Card className="card__container__item">
                        <h3>Видеокарты</h3>
                        <Paragraph>
                            <ul>
                                {data.graphics.map((graphic, key) => (
                                    <li key={key}>
                                        <span>Модель: {graphic.model}</span>
                                        <br />
                                        <span>Кол-во памяти: {graphic.vram}</span>
                                    </li>
                                ))}
                            </ul>
                        </Paragraph>
                    </Components.Card>
                    <Components.Card className="card__container__item">
                        <h3>Операционная система</h3>
                        <Paragraph>
                            <span>Название: {data.os.distro}</span>
                            <br />
                            <span>Архитектура: {data.os.arch}</span>
                        </Paragraph>
                    </Components.Card>
                    <Components.Card className="card__container__item">
                        <h3>Диски</h3>
                        <Paragraph>
                            <ul>
                                {data.disks.map((disk, key) => (
                                    <li key={key}>
                                        <span>Модель: {disk.model}</span>
                                        <br />
                                        <span>Кол-во памяти: {disk.size}</span>
                                    </li>
                                ))}
                            </ul>
                        </Paragraph>
                    </Components.Card>
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
        </Information.StaticData>
    )
}

export default StaticDataComponent
