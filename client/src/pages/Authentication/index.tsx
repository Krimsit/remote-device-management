import * as React from "react"

import { Authentication as AuthenticationContainer } from "../../modules"

import { Layout } from "../../style"

const Authentication = () => {
    return (
        <Layout.Center style={{ width: "100%", height: "100%" }} align="center" direction="vertical">
            <AuthenticationContainer />
        </Layout.Center>
    )
}

export default Authentication
