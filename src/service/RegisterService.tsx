import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import DangerLabel from "../common/components/DangerLabel"
import Form from "../common/components/Form"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormButtonBar from "../common/components/FormButtonBar"
import FormInput from "../common/components/FormInput"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { newService } from "./serviceService"
import FormInputNumber from "../common/components/FormInputNumber"
import { useSessionIsp } from "../store/ispStore"
import { Container } from "react-bootstrap"

export default function Register() {
    const isp = useSessionIsp()
    const history = useNavigate()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const errorHandler = useErrorHandler()

    const createClick = async () => {
    errorHandler.cleanRestValidations()
    if (!name) {
      errorHandler.addError("name", "No puede estar vacío")
    }
    if (!price) {
      errorHandler.addError("password", "No puede estar vacío")
    }
    if (!description) {
        errorHandler.addError("description", "No puede estar vacío")
      }

    if (errorHandler.hasErrors()) {
      return
    }

    try {
      await newService({
        isp_id: isp!.id,
        service: {
          name,
          description,
          price: parseInt(price),
        }
      })
      history("/")
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }
  if (isp!== undefined){
    return(
      <div className="ms-5">
        <GlobalContent>
          <div className="mt-5"><FormTitle>Registrar Servicio</FormTitle></div>

          <Form>
            <div className="col-5">
              <FormInput
                label="Nombre"
                name="name"
                value={name}
                errorHandler={errorHandler}
                onChange={(e) => setName(e.target.value)}
              />

              <FormInputNumber
                label="Precio"
                name="price"
                value={price}
                errorHandler={errorHandler}
                onChange={(e) => setPrice(e.target.value)}
              />

              <FormInput
                label="Descripción"
                name="description"
                value={description}
                errorHandler={errorHandler}
                onChange={(e) => setDescription(e.target.value)}
              />

              <DangerLabel message={errorHandler.errorMessage} />
            </div>

            <div className="mt-2">
              <FormButtonBar>
                <FormAcceptButton label="Crear Servicio" onClick={createClick} />
                <FormButton label="Cancelar" onClick={() => history("/")} />
              </FormButtonBar>
            </div>
          </Form>

        </GlobalContent>
      </div>
    )
  } else {
    return(<div className="mt-5"><Container><DangerLabel message= "No se encontro un Isp valido" ></DangerLabel></Container></div>)
  }
}