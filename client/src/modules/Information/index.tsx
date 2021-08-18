import * as React from "react"

import { Status, StaticData, DynamicData } from "./containers"

import { Information as InformationStyle } from "../../style"

const Information = () => {
    return (
        <InformationStyle.Layout>
            <InformationStyle.Block>
                <h2 className="block__title">Статическая информация</h2>
                <div className="block__container">
                    <Status />
                    <StaticData />
                </div>
            </InformationStyle.Block>
            <InformationStyle.Block>
                <h2 className="block__title">Динамическая информация</h2>
                <div className="block__container">
                    <DynamicData />
                </div>
            </InformationStyle.Block>
        </InformationStyle.Layout>
    )
}

export default Information
