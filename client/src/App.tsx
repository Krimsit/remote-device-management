import * as React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"

import { Authentication, Dashboard } from "./pages"

interface IAppContainerProps {
    isAuth: boolean
}

const App: React.FC<IAppContainerProps> = ({ isAuth }) => {
    return (
        <div style={{ background: "#e5e5e5", width: "100%", height: "100%" }}>
            <Switch>
                <Route exact path={["/authentication"]} render={() => (isAuth ? <Redirect to="/dashboard" /> : <Authentication />)} />
                <Route path={["/", "/dashboard"]} render={() => (isAuth ? <Dashboard /> : <Redirect to="/authentication" />)} />
            </Switch>
        </div>
    )
}

const mapStateToProps = (state: any): { isAuth: boolean } => {
    return { isAuth: state.user.isAuth }
}

export default connect(mapStateToProps)(App)
