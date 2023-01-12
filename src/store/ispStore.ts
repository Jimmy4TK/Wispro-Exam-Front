import { Subject } from "rxjs"
import { Isp } from "../isp/ispService"
import { useState, useLayoutEffect } from "react"

let currentIsp: Isp | undefined

const ispSubject = new Subject<Isp | undefined>()

export function useSessionIsp() {
  const [isp, setIsp] = useState(currentIsp)

  useLayoutEffect(() => {
    ispSubject.subscribe((newState) => {
      setIsp(newState)
    })
  }, [])

  return isp
}

export function updateSessionIsp(isp: Isp) {
  currentIsp = isp
  ispSubject.next(currentIsp)
}

export function cleanupSessionIsp() {
  currentIsp = undefined
  ispSubject.next(currentIsp)
}
