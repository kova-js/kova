import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const request = axios.create({
  baseURL: '/',
  timeout: 6000,
})

// http请求拦截器
request.interceptors.request.use(requestHandler, errorHandler)

// http响应拦截器
request.interceptors.response.use(responseHandler, errorHandler)

/**
 * 请求拦截方法
 * @param config
 */
function requestHandler(
  config: AxiosRequestConfig,
): AxiosRequestConfig | Promise<AxiosRequestConfig> {
  // const { accessToken } = store.getters
  // if (accessToken) config.headers.Authorization = `JWT ${accessToken}`
  return config
}

/**
 * 响应拦截方法
 * @param response
 */
function responseHandler(response: AxiosResponse<any>): AxiosResponse<any> {
  return response.data
}

/**
 * 异常处理方法
 * @param err
 */
function errorHandler(err: AxiosError): Promise<AxiosError> {
  return Promise.reject(err)
}

export { request }
