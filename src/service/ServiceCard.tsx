import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import GlobalContent from "../common/components/GlobalContent"
import { RequestService, Service, UserService } from "./serviceService"
import { Button, Card, Container } from "react-bootstrap"
import { useSessionUser } from "../store/userStore"


export default function ServiceCard(props:any) {
    const history = useNavigate()
    const user = useSessionUser()
    let id:number
    let name:string
    let price:number
    let description:string
    let isp_id:number

    function renderRequestService(params: {id:number,isps_id:number, user: {id: number }}){
        let res=RequestService({
            user:{id: user!.id},
            id: props.id,
            isps_id: props.isp_id
        })
        debugger
        if (res==undefined){
        history('/nosendrequest')
        } else {
        history("/sendrequest")
        }
    }
    
    return (
        <GlobalContent>
            <Container className="mt-3">
                <Card className="mt-2" >
                    <Card.Header>{props.name}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        {props.description}
                        </Card.Text>
                        <Card.Footer>
                            <div className="text-muted">{props.price}</div>
                        </Card.Footer>
                        {user!== undefined ? <Button onClick={()=>renderRequestService({
                            user:{id: user!.id},
                            id: props.id,
                            isps_id: props.isp_id
                        })}variant="primary">Peticion</Button> : ''}
                    </Card.Body>
                </Card>
            </Container>
        </GlobalContent>
    )
}