import * as React from "react"
import { Card, Typography } from "antd"

import { Information } from "../../../../style"

const { Paragraph, Title } = Typography

interface IGeneralComponentProps {
    loading: boolean
    data: {
        model: string
        cpu: {
            model: string
            cores: number
            speed: string
        }
        memory: number
        graphics: Array<{
            model: string
            vram: number
        }>
        os: {
            distro: string
            arch: string
        }
        disks: Array<{
            model: string
            size: number
        }>
    }
}

const General: React.FC<IGeneralComponentProps> = ({ loading, data }) => {
    return (
        <Information.General>
            <Title level={2}>Общая информация</Title>
            {!loading && data ? (
                <div className="container">
                    <Card title="Модель">{data.model}</Card>
                    <Card title="Процессор">
                        <Paragraph>
                            <span>Модель: {data.cpu.model}</span>
                            <br />
                            <span>Кол-во ядер: {data.cpu.cores}</span>
                            <br />
                            <span>Частота: {data.cpu.speed}</span>
                        </Paragraph>
                    </Card>
                    <Card title="Оперативная память">{data.memory}</Card>
                    <Card title="Видеокарты">
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
                    </Card>
                    <Card title="Операционная система">
                        <Paragraph>
                            <span>Название: {data.os.distro}</span>
                            <br />
                            <span>Архитектура: {data.os.arch}</span>
                        </Paragraph>
                    </Card>
                    <Card title="Диски">
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
                    </Card>
                </div>
            ) : (
                <div>LOADING</div>
            )}
        </Information.General>
    )
}

export default General
