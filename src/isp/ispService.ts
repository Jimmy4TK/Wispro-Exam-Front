import axios, { AxiosError } from "axios"
import { http } from "../common/http"
import { updateSessionToken, cleanupSessionToken } from "../store/tokenStore"
import { cleanupSessionIsp, updateSessionIsp } from "../store/ispStore"
import { UserService, UserServices } from "../service/serviceService"
import { updateSessionUserServices } from "../store/userservicesStore"

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

export interface Isp {
  id: number
  name: string
  token: string
}

export async function newIsp(params: {
  confirm_password: string,
  isp: {name: string,
    password: string}
}): Promise<Isp> {
  try {
    const res = (await axios.post(http.backendUrl + "/isps", params))
    .data as Isp
  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentIsp(res).then()
  return res
  } catch (err) {
    const axiosError = err as AxiosError
    throw err
  }
}

export async function loginisp(params: {
  isp:{
    name: string
    password: string
  }
}): Promise<Isp> {
  const res = (
    await axios.post(http.backendUrl + "/isps/login", params)
  ).data as Isp

  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentIsp(res).then()
  return res
}

export async function listRequest(isp_id:number):Promise<UserServices> {
  try {
    const res = (
      await axios.get(http.backendUrl + "isps/"+isp_id+"/list_request")
    ).data as UserServices
    debugger
    void reloadCurrentUserServices(res).then()
    return res
  } catch (err) {
    const axiosError = err as AxiosError

    if (axiosError.response && axiosError.response.status === 401) {
      void logoutisp()
    }
    throw err
  }
}

export async function listReject(isp_id:number):Promise<UserServices> {
  try {
    const res = (
      await axios.get(http.backendUrl + "isps/"+isp_id+"/list_reject")
    ).data as UserServices
    debugger
    void reloadCurrentUserServices(res).then()
    return res
  } catch (err) {
    const axiosError = err as AxiosError

    if (axiosError.response && axiosError.response.status === 401) {
      void logoutisp()
    }
    throw err
  }
}

export async function CheckRequest(params:{isp_id:number,service_id:number,id:number,userservice:{status:string}}):Promise<UserService> {
  try {
    const res = (
      await axios.put(http.backendUrl + "isps/"+params.isp_id+"/services/"+params.service_id+"/user_service/"+params.id+"/check_request", params)
    ).data as UserService
    
    return res
  } catch (err) {
    const axiosError = err as AxiosError

    if (axiosError.response && axiosError.response.status === 401) {
      void logoutisp()
    }
    throw err
  }
}

export async function changePassword(params: {
  id: number
  current_password: string
  password: string
  confirm_password: string
}): Promise<void> {
  try {
    await axios.put(http.backendUrl + "/isps/"+params.id+"/change_password", params)
    return
  } catch (err) {
    const axiosError = err as AxiosError

    if (axiosError.response && axiosError.response.status === 401) {
      void logoutisp()
    }
    throw err
  }
}




export async function logoutisp(): Promise<void> {
  localStorage.removeItem("token")
  localStorage.removeItem("isp")

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = ""
    return
  } catch (err) {
    return
  } finally {
    cleanupSessionToken()
    cleanupSessionIsp()
  }
}


// Valores almacenados en LOCAL STORE
function getCurrentToken(): string | undefined {
  const result = localStorage.getItem("token")
  return result ? result : undefined
}

function setCurrentToken(token: string) {
  localStorage.setItem("token", token)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios.defaults.headers.common.Authorization = "Bearer " + token
}

function getCurrentIsp(): Isp | undefined {
  return localStorage.getItem("isp") as unknown as Isp
}

export async function reloadCurrentIsp(isp: Isp){
  localStorage.setItem("isp", JSON.stringify(isp))
  updateSessionIsp(isp)
  return isp
}

export async function reloadCurrentUserServices(userservices: UserServices){
  localStorage.setItem("userservices", JSON.stringify(userservices))
  updateSessionUserServices(userservices)
  return userservices
}

if (getCurrentToken()) {
  const currentIsp = getCurrentIsp()
  const currentToken = getCurrentToken()
  if (currentIsp !== undefined && currentToken !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = "Bearer " + currentToken
    updateSessionToken(currentToken)
    updateSessionIsp(currentIsp)
    void reloadCurrentIsp(currentIsp).then()
  }
}
