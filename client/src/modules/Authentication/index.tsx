import * as React from "react"
import { useState } from "react"
import { Button } from "antd"
import { useHistory } from "react-router-dom"

import { Login, Registration } from "./containers"

const Authentication = () => {
    const [page, setPage] = useState("login")
    const history = useHistory()

    return (
        <div>
            {page === "login" ? <Login history={history} /> : page === "registration" && <Registration history={history} />}
            <Button type="link" onClick={() => setPage(page === "login" ? "registration" : "login")}>
                {page === "login" ? "Зарегистрироваться" : page === "registration" && "Войти"}
            </Button>
        </div>
    )
}

export default Authentication
