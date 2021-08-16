import * as React from "react"
import { Typography, Tooltip, Skeleton } from "antd"
import { UndoOutlined } from "@ant-design/icons"

import { IDesktopStaticData } from "../../../../interface/desktop"

import { Information, Button } from "../../../../style"

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
                    <div className="card__container__item">
                        <h3>Модель</h3>
                        {data.model}
                    </div>
                    <div className="card__container__item">
                        <h3>Процессор</h3>

                        <Paragraph>
                            <span>Модель: {data.cpu.model}</span>
                            <br />
                            <span>Кол-во ядер: {data.cpu.cores}</span>
                            <br />
                            <span>Частота: {data.cpu.speed}</span>
                        </Paragraph>
                    </div>
                    <div className="card__container__item">
                        <h3>Оперативная память</h3>
                        {data.memory}
                    </div>
                    <div className="card__container__item">
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
                    </div>
                    <div className="card__container__item">
                        <h3>Операционная система</h3>
                        <Paragraph>
                            <span>Название: {data.os.distro}</span>
                            <br />
                            <span>Архитектура: {data.os.arch}</span>
                        </Paragraph>
                    </div>
                    <div className="card__container__item">
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
                    </div>
                    <Tooltip title="Обновить" className="card__container__btn">
                        <Button.Update type="text" onClick={updateData}>
                            <UndoOutlined />
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
