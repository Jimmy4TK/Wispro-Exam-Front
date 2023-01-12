import React from "react"
import Form from "../common/components/Form"
import { Container } from "react-bootstrap"
import FormTitle from "../common/components/FormTitle"
import { useSessionUser } from "../store/userStore"
import { useSessionToken } from "../store/tokenStore"
import { useSessionIsp } from "../store/ispStore"

export default function StateInfo() {
    const user = useSessionUser()
    const isp = useSessionIsp()
    const token = useSessionToken()

    if (user!== undefined){
        return (
            <Container className="mt-2">
                <FormTitle>Información de Perfil</FormTitle>

                <Form>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input className="form-control" id="name" value={user!.name} disabled />
                    </div>
                    <div className="form-group">
                        <label>Apellido</label>
                        <input className="form-control" id="last_name" value={user!.last_name} disabled />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" id="name" value={user!.mail} disabled />
                    </div>
                    
                </Form>
            </Container>
        )
    } else {
        return (
            <Container className="mt-2">
                <FormTitle>Información de Isp</FormTitle>

                <Form>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input className="form-control" id="name" value={isp!.name} disabled />
                    </div>                    
                </Form>
            </Container>
        )
    }
}

