import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import DangerLabel from "../../common/components/DangerLabel"
import Form from "../../common/components/Form"
import FormAcceptButton from "../../common/components/FormAcceptButton"
import FormButton from "../../common/components/FormButton"
import FormButtonBar from "../../common/components/FormButtonBar"
import { Container } from "react-bootstrap"
import FormPassword from "../../common/components/FormPassword"
import FormTitle from "../../common/components/FormTitle"
import GlobalContent from "../../common/components/GlobalContent"
import { useErrorHandler } from "../../common/utils/ErrorHandler"
import { changePassword, User } from "../../user/userService"
import { useSessionUser } from "../../store/userStore"


export default function Password() {
    const history = useNavigate()
    const [current_password, setCurrent_Password] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirm_Password] = useState("")
    const user:User|undefined = useSessionUser()

    const errorHandler = useErrorHandler()

    const updatePasswordClick = async () => {
        errorHandler.cleanRestValidations()

        if (!current_password) {
            errorHandler.addError("current_password", "No puede estar vacío")
        }
        if (!password) {
            errorHandler.addError("password", "No puede estar vacío")
        }
        if (password !== confirm_password) {
            errorHandler.addError("confirm_password", "Las contraseñas no coinciden")
        }

        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await changePassword({
                user:{
                    current_password,
                    password,
                    confirm_password,
                    id: user!.id
                }
            })
            history("/")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    return (
        <Container className="mt-2">
            <GlobalContent>
                <FormTitle>Cambiar Password</FormTitle>

                <Form>
                    <div className="col-5"> 
                        <FormPassword
                            label="Password Actual"
                            name="current_password"
                            errorHandler={errorHandler}
                            onChange={event => setCurrent_Password(event.target.value)} />

                        <FormPassword
                            label="Nuevo Password"
                            name="password"
                            errorHandler={errorHandler}
                            onChange={event => setPassword(event.target.value)} />

                        <FormPassword
                            label="Repetir Password"
                            name="confirm_password"
                            errorHandler={errorHandler}
                            onChange={event => setConfirm_Password(event.target.value)} />

                        <DangerLabel message={errorHandler.errorMessage} />

                        <FormButtonBar>
                            <FormAcceptButton label="Cambiar" onClick={updatePasswordClick} />
                            <FormButton label="Cancelar" onClick={() => history("/")} />
                        </FormButtonBar>
                    </div>
                </Form >
            </GlobalContent>
        </Container>
    )
}
