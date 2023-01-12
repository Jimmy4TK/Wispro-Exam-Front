import axios, { AxiosError } from "axios"
import { http } from "../common/http"
import { updateSessionServices } from "../store/servicesStore"

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"


export interface Service {
  id: number
  name: string
  price: number
  description: string
  isp_id: number
}

export interface UserService {
  id: number
  status: string
  user_id: number
  service_id: number
}

export interface UserServices{
  userservices: Array<UserService>
}

export interface Services{
  services:Array<Service>
}

export async function newService(params: {
  isp_id: number
  service: {
    name: string,
    price: number,
    description: string
    }
}): Promise<Service> {
  try {
    const res = (await axios.post(http.backendUrl + "/isps/"+params.isp_id+"/services", params))
    .data as Service
  return res
  } catch (err) {
    const axiosError = err as AxiosError
    throw err
  }
}

export async function listServices(): Promise<Services> {
  try {
    const res = (await axios.get(http.backendUrl + "/services"))
    .data as Services
    void reloadCurrentServices(res).then()
  return res
  } catch (err) {
    const axiosError = err as AxiosError
    throw err
  }
}

export async function RequestService(params: {id:number,isps_id:number, user: {id: number }}): Promise<UserService> {
  try {
    const res = (
      await axios.post(http.backendUrl + "/isps/"+params.isps_id+"/services/"+params.id+"/request",params)
    ).data as UserService
  return res
  } catch (err) {
    const axiosError = err as AxiosError
    throw err
  }
}

function getCurrentServices(): Services | undefined {
  return localStorage.getItem("services") as unknown as Services
}

export async function reloadCurrentServices(services: Services){
  localStorage.setItem("services", JSON.stringify(services))
  updateSessionServices(services)
  return services
}

