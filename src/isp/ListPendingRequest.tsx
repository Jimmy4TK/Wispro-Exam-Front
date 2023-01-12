import React, { useEffect } from "react"
import GlobalContent from "../common/components/GlobalContent"
import { useSessionUserServices } from "../store/userservicesStore"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { listRequest } from "./ispService"
import { useSessionIsp } from "../store/ispStore"
import RequestTable from "./Request"
import { Table } from "react-bootstrap"

export default function ListPendingRequest() {
    const isp = useSessionIsp()
    const errorHandler = useErrorHandler()
    const userservices = useSessionUserServices()
    
    useEffect(() => {
        let await_list = async () => {
            try{
                const data = await listRequest(isp!.id);
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
        await_list()
    }, []);
    
    function renderRequest(id:number,service_id:number,user_id:number,status:string,isp_id:number){
        return(<RequestTable id={id} service_id={service_id} user_id={user_id} status={status} isp_id={isp_id} />)
    }
    return (
        <GlobalContent>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Service ID</td>
                        <td>User ID</td>
                        <td>Estado</td>
                        <td>Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {userservices?.userservices.map((userservice)=>(renderRequest(userservice.id,userservice.service_id,userservice.user_id, userservice.status, isp!.id)))}
                </tbody>
            </Table>
        </GlobalContent >
    )
}