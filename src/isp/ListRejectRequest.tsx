import React, { useEffect, useState } from "react"
import GlobalContent from "../common/components/GlobalContent"
import { useSessionUserServices } from "../store/userservicesStore"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { listReject } from "./ispService"
import { useSessionIsp } from "../store/ispStore"
import RequestTable from "./Request"

export default function ListRejectRequest() {
    const isp = useSessionIsp()
    const errorHandler = useErrorHandler()
    const userservices = useSessionUserServices()
    
    
    useEffect(() => {
        let await_list = async () => {
            try{
                const data = await listReject(isp!.id);
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
            {userservices?.userservices.map((userservice)=>(renderRequest(userservice.id,userservice.service_id,userservice.user_id, userservice.status, isp!.id)))}
        </GlobalContent >
    )
}