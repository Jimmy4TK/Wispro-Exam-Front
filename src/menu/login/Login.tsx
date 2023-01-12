import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import DangerLabel from "../../common/components/DangerLabel"
import Form from "../../common/components/Form"
import FormAcceptButton from "../../common/components/FormAcceptButton"
import FormButton from "../../common/components/FormButton"
import FormButtonBar from "../../common/components/FormButtonBar"
import FormInput from "../../common/components/FormInput"
import FormPassword from "../../common/components/FormPassword"
import FormTitle from "../../common/components/FormTitle"
import GlobalContent from "../../common/components/GlobalContent"
import { useErrorHandler } from "../../common/utils/ErrorHandler"
import { login } from "../../user/userService"
import { loginisp } from "../../isp/ispService"
import { Button } from "react-bootstrap"

export default function Login() {
    const history = useNavigate()
    const [change, setChange] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const errorHandler = useErrorHandler()

    const loginClick = async () => {
        errorHandler.cleanRestValidations()
        if (!email) {
            errorHandler.addError("email", "No puede estar vacío")
        }
        if (!password) {
            errorHandler.addError("password", "No puede estar vacío")
        }
        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await login({
                user:{
                    mail: email,
                    password
                }
            })
            history('/')
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }
    const loginClickIsp = async () => {
        errorHandler.cleanRestValidations()
        if (!name) {
            errorHandler.addError("name", "No puede estar vacío")
        }
        if (!password) {
            errorHandler.addError("password", "No puede estar vacío")
        }
        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await loginisp({
                isp:{
                    name: name,
                    password
                }
            })
            history('/')
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }
    if (change) {
        return (
            <GlobalContent>
                <div className="mt-5"><FormTitle>Login Usuario</FormTitle></div>

                <Form>
                    <div className="col-5">
                        <FormInput
                            label="Email"
                            name="email"
                            errorHandler={errorHandler}
                            onChange={(event) => setEmail(event.target.value)} />

                        <FormPassword
                            label="Password"
                            name="password"
                            errorHandler={errorHandler}
                            onChange={(event) => setPassword(event.target.value)} />

                        <DangerLabel message={errorHandler.errorMessage} />
                    </div>

                    <div className="mt-2">
                        <FormButtonBar>
                            <FormAcceptButton label="Login" onClick={loginClick} />
                            <FormButton label="Cancelar" onClick={() => history('/')} />
                        </FormButtonBar>
                    </div>
                </Form >
                <Button className="mt-5" variant="warning" onClick={() => setChange(false)}>Logearse como ISP</Button>
            </GlobalContent >
        )
    } else {
        return (
            <GlobalContent>
                <div className="mt-5"><FormTitle>Login Isp</FormTitle></div>

                <Form>
                    <div className="col-5">
                        <FormInput
                            label="Nombre"
                            name="name"
                            errorHandler={errorHandler}
                            onChange={(event) => setName(event.target.value)} />

                        <FormPassword
                            label="Password"
                            name="password"
                            errorHandler={errorHandler}
                            onChange={(event) => setPassword(event.target.value)} />

                        <DangerLabel message={errorHandler.errorMessage} />
                    </div>

                    <div className="mt-2">
                        <FormButtonBar>
                            <FormAcceptButton label="Login" onClick={loginClickIsp} />
                            <FormButton label="Cancelar" onClick={() => history('/')} />
                        </FormButtonBar>
                    </div>
                </Form >
                <Button className="mt-5" variant="warning" onClick={() => setChange(true)}>Logearse como Usuario</Button>
            </GlobalContent >
        )
    }
}
