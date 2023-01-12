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
import { newUser } from "../../user/userService"
import { Button } from "react-bootstrap"
import { newIsp } from "../../isp/ispService"

export default function Register() {
  const history = useNavigate()
  const [change, setChange] = useState(true)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [last_name, setLast_Name] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirm_password] = useState("")

  const errorHandler = useErrorHandler()

  const registerClick = async () => {
    errorHandler.cleanRestValidations()
    if (!email) {
      errorHandler.addError("email", "No puede estar vacío")
    }
    if (!name) {
      errorHandler.addError("name", "No puede estar vacío")
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
      await newUser({
        confirm_password,
        user: {
          mail: email,
          name,
          last_name,
          password,
        }
      })
      history("/")
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }
  const registerClickIsp = async () => {
    errorHandler.cleanRestValidations()
    if (!name) {
      errorHandler.addError("name", "No puede estar vacío")
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
      await newIsp({
        confirm_password,
        isp: {
          name,
          password,
        }
      })
      history("/")
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }
  if (change) {
    return (
      <GlobalContent>
        <div className="mt-5"><FormTitle>Registrar Usuario</FormTitle></div>

        <Form>
          <div className="col-5">
            <FormInput
              label="Email"
              name="email"
              value={email}
              errorHandler={errorHandler}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormInput
              label="Nombre"
              name="name"
              value={name}
              errorHandler={errorHandler}
              onChange={(e) => setName(e.target.value)}
            />

            <FormInput
              label="Apellido"
              name="last_name"
              value={last_name}
              errorHandler={errorHandler}
              onChange={(e) => setLast_Name(e.target.value)}
            />

            <FormPassword
              label="Password"
              name="password"
              value={password}
              errorHandler={errorHandler}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormPassword
              label="Repetir Password"
              name="confirm_password"
              value={confirm_password}
              errorHandler={errorHandler}
              onChange={(e) => setConfirm_password(e.target.value)}
            />

            <DangerLabel message={errorHandler.errorMessage} />
          </div>

          <div className="mt-2">
            <FormButtonBar>
              <FormAcceptButton label="Registrarse" onClick={registerClick} />
              <FormButton label="Cancelar" onClick={() => history("/")} />
            </FormButtonBar>
          </div>

          <Button className="mt-5" variant="warning" onClick={() => setChange(false)}>Registrarse como ISP</Button>
        </Form>

      </GlobalContent>
    ) 
  } else { 
    return (
      <GlobalContent>
        <div className="mt-5"><FormTitle >Registrar Isp</FormTitle></div>

        <Form>
          <div className="col-5">
            <FormInput
              label="Nombre"
              name="name"
              value={name}
              errorHandler={errorHandler}
              onChange={(e) => setName(e.target.value)}
            />

            <FormPassword
              label="Password"
              name="password"
              value={password}
              errorHandler={errorHandler}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormPassword
              label="Repetir Password"
              name="confirm_password"
              value={confirm_password}
              errorHandler={errorHandler}
              onChange={(e) => setConfirm_password(e.target.value)}
            />

            <DangerLabel message={errorHandler.errorMessage} />
          </div>

          <div className="mt-2">
            <FormButtonBar>
              <FormAcceptButton label="Registrarse" onClick={registerClickIsp} />
              <FormButton label="Cancelar" onClick={() => history("/")} />
            </FormButtonBar>
          </div>

          <Button className="mt-5" variant="warning" onClick={() => setChange(true)}>Registrarse como Usuario</Button>
        </Form>

      </GlobalContent>
    ) 
  }
}
