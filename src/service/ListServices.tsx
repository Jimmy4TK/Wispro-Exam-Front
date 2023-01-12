import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import GlobalContent from "../common/components/GlobalContent"
import { useSessionServices } from "../store/servicesStore"
import ServiceCard from "./ServiceCard"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { listServices } from "./serviceService"

export default function ListServices() {
    const errorHandler = useErrorHandler()
    const services = useSessionServices()
    
    
    useEffect(() => {
        let await_list = async () => {
            try{
                const data = await listServices();
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
        await_list()
    }, []);
    
    function renderService(id:number,name:string,price:number,description:string,isp_id:number){
        return(<ServiceCard id={id} name={name} price={price} description={description} isp_id={isp_id} />)
    }
    return (
        <GlobalContent>
            {services?.services.map((service)=>(renderService(service.id,service.name,service.price, service.description, service.isp_id)))}
        </GlobalContent >
    )
}