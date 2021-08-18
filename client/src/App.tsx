import * as React from "react"
import { useState, useEffect } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

import { socket } from "./core"
import { getNotification, getData } from "./utils/helper"

import { Authentication, Dashboard } from "./pages"

interface IAppContainerProps {
    isAuth: boolean
    client_id: string
}

const App: React.FC<IAppContainerProps> = ({ isAuth, client_id }) => {
    const [notificationData, setNotificationData] = useState({
        status: 0,
        data: null,
    })
    const [openNotification, setOpenNotification] = useState(false)

    useEffect(() => {
        socket.on("connect", async () => {
            socket.emit("SERVER:JOIN_ROOM", { user: true, client_id: client_id })
        })
    }, [])

    getNotification(setOpenNotification, setNotificationData)
    getData(client_id)

    return (
        <div style={{ background: "#e5e5e5", width: "100%", height: "100%" }}>
            <Snackbar
                open={openNotification}
                autoHideDuration={3000}
                onClose={() => {
                    setOpenNotification(false)
                }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={notificationData.status === 200 ? "success" : "error"} variant="filled">
                    {notificationData.data}
                </Alert>
            </Snackbar>
            <Switch>
                <Route exact path={["/authentication"]} render={() => (isAuth ? <Redirect to="/dashboard" /> : <Authentication />)} />
                <Route path={["/", "/dashboard"]} render={() => (isAuth ? <Dashboard /> : <Redirect to="/authentication" />)} />
            </Switch>
        </div>
    )
}

const mapStateToProps = (state: any): { isAuth: boolean; client_id: string } => {
    return { isAuth: state.user.isAuth, client_id: state.user._id }
}

export default connect(mapStateToProps)(App)
