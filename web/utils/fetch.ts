import axios from 'axios'

const request = axios.create()

request.interceptors.request.use(
  function (config) {
    console.log(window.__VUE_APP__)
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)
export { request }

export function fetch() {
  //
}
