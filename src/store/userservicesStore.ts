import { Subject } from "rxjs"
import { UserServices } from "../service/serviceService"
import { useState, useLayoutEffect } from "react"

let currentUserServices: UserServices | undefined

const userservicesSubject = new Subject<UserServices| undefined>()

export function useSessionUserServices() {
  const [userservices, setUserServices] = useState(currentUserServices)

  useLayoutEffect(() => {
    userservicesSubject.subscribe((newState) => {
      setUserServices(newState)
    })
  }, [])

  return userservices
}

export function updateSessionUserServices(userservices: UserServices) {
  currentUserServices = userservices
  userservicesSubject.next(currentUserServices)
}

export function cleanupSessionUserServices() {
  currentUserServices = undefined
  userservicesSubject.next(currentUserServices)
}
