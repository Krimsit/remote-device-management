import * as React from "react"
import { socket } from "../../core"

import { Status, General } from "./containers"

import { Information as InformationStyle } from "../../style"

const Information = () => {
    return (
        <InformationStyle.Layout>
            <Status />
            <General />
        </InformationStyle.Layout>
    )
}

export default Information
