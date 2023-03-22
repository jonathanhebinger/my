import { ActionList } from '@my/api'
import { Action } from '@my/shared/types'
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

let httpRoot = ''
export function httpSetRoot(root: string) {
  httpRoot = root
  httpUpdateConfig()
}
export function httpGetRoot() {
  return httpRoot
}

let httpCors = false
export function httpSetCors(cors: boolean) {
  httpCors = cors
  httpUpdateConfig()
}
export function httpGetCors() {
  return httpCors
}

let httpAuth = 'none'
export function httpSetAuth(auth: string) {
  httpAuth = auth
  httpUpdateConfig()
}
export function httpGetAuth() {
  return httpAuth
}

let httpConfig: AxiosRequestConfig = {}
export function httpGetConfig() {
  return httpConfig
}
export function httpUpdateConfig() {
  const tokenHeader = { Authorization: `Bearer ${httpAuth}` }
  const corsHeaders = httpCors
    ? {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,PATCH,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
      }
    : {}

  httpConfig = {
    baseURL: httpRoot,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
      ...tokenHeader,
    },
    responseType: 'json',
    proxy: {
      host: 'localhost',
      port: 3000,
    },
  }
}

const httpOnUnauthorizedHandlers = new Set<() => void>()
export function httpOnUnauthorized(handler: () => void) {
  httpOnUnauthorizedHandlers.add(handler)

  return () => {
    httpOnUnauthorizedHandlers.delete(handler)
  }
}

let httpAxios!: AxiosInstance
export function httpGetAxios() {
  return httpAxios
}

export function httpInit() {
  httpAxios = Axios.create()
  httpAxios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        httpOnUnauthorizedHandlers.forEach(handler => handler())
        httpSetAuth('')
      }

      return error
    },
  )
}

export async function httpExec<
  N extends ActionList['name'],
  A extends ActionList = ActionList & Action<N, unknown, unknown>,
  D extends A['data'] = A['data'],
  R extends A['result'] = A['result'],
>(name: N, ...args: D extends never ? [] : [data: D]) {
  const action = {
    name,
    data: args[0] || {},
  }

  return (await httpAxios.post<R>('', JSON.stringify(action), httpConfig)).data
}
