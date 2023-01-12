import { Subject } from "rxjs"
import { Services } from "../service/serviceService"
import { useState, useLayoutEffect } from "react"

let currentServices: Services | undefined

const servicesSubject = new Subject<Services| undefined>()

export function useSessionServices() {
  const [services, setServices] = useState(currentServices)

  useLayoutEffect(() => {
    servicesSubject.subscribe((newState) => {
      setServices(newState)
    })
  }, [])

  return services
}

export function updateSessionServices(services: Services) {
  currentServices = services
  servicesSubject.next(currentServices)
}

export function cleanupSessionServices() {
  currentServices = undefined
  servicesSubject.next(currentServices)
}
