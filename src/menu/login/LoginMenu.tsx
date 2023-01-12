import React from "react"
import { Container } from "react-bootstrap"
import Login from "./Login"
import Register from "./Register"
import Sidebar from "../../menu/Sidebar"

export default function LoginMenu() {
    const menu = () => { switch(window.location.pathname) {

        case "/register":   return <Register />;
        case "/login":   return <Login />;
    }}
    return (
        <div className="d-flex flex-row">
            <Sidebar />
            <Container>{ menu() }</Container>
        </div>
    )
}