import axios, { AxiosError } from "axios"
import { http } from "../common/http"
import { updateSessionToken, cleanupSessionToken } from "../store/tokenStore"
import { cleanupSessionUser, updateSessionUser } from "../store/userStore"

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

export interface User {
  id: number
  mail: string
  name: string
  last_name: string
  token: string
}

export async function newUser(params: {
  confirm_password: string,
  user: {name: string,
    last_name: string,
    password: string,
    mail: string}
}): Promise<User> {
  try {
    const res = (await axios.post(http.backendUrl + "/users", params))
    .data as User
  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentUser(res).then()
  return res
  } catch (err) {
    const axiosError = err as AxiosError
    throw err
  }
}

export async function login(params: {
  user:{
    mail: string
    password: string
  }
}): Promise<User> {
  const res = (
    await axios.post(http.backendUrl + "/users/login", params)
  ).data as User

  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentUser(res).then()
  return res
}

export async function changePassword(params: {
  user:{
    id: number
    password: string
    current_password: string
    confirm_password: string
  }
}): Promise<void> {
  try {
    await axios.put(http.backendUrl + "/users/"+params.user.id+"/change_password", params)
    return
  } catch (err) {
    const axiosError = err as AxiosError

    if (axiosError.response && axiosError.response.status === 401) {
      void logout()
    }
    throw err
  }
}

export async function logout(): Promise<void> {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  try {
    //await axios.get(http.backendUrl + "/users/signout")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = ""
    return
  } catch (err) {
    return
  } finally {
    cleanupSessionToken()
    cleanupSessionUser()
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

function getCurrentUser(): User | undefined {
  return localStorage.getItem("user") as unknown as User
}

export async function reloadCurrentUser(user: User){
  localStorage.setItem("user", JSON.stringify(user))
  updateSessionUser(user)
  return user
}

if (getCurrentToken()) {
  const currentUser = getCurrentUser()
  const currentToken = getCurrentToken()
  if (currentUser !== undefined && currentToken !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = "Bearer " + currentToken
    updateSessionToken(currentToken)
    updateSessionUser(currentUser)
    void reloadCurrentUser(currentUser).then()
  }
}
