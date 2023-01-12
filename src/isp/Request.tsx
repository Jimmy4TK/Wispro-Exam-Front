import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import GlobalContent from "../common/components/GlobalContent"
import { CheckRequest } from "./ispService"
import { Button, Card, Container } from "react-bootstrap"
import { useSessionUser } from "../store/userStore"


export default function RequestTable(props:any) {
    const history = useNavigate()
    let id:number
    let isp_id:number
    let service_id:number
    let user_id:number
    let status:string

    function renderCheckRequest(status:string){
        CheckRequest({
            isp_id:props.isp_id,
            service_id:props.service_id,
            id:props.id,
            userservice:{status}})
    }
    
    return (
        <tr>
          <td>{props.id}</td>
          <td>{props.service_id}</td>
          <td>{props.user_id}</td>
          <td>{props.status}</td>
          {props.status!=="pendiente" ? <td> <Button variant="success" onClick={()=>{renderCheckRequest("aprobado")}}>Aceptar</Button><Button variant="danger" onClick={()=>{renderCheckRequest("rechazado")}}>Cancelar</Button> </td> : <td>"No se encuentran acciones"</td>}
        </tr>
    )
}