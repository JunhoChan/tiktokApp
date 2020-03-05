import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

/**
 * @param {Object} config
 */
const onRequestSuccess = (config: any) => {
  return config
}

/**
 * @param {Object} config
 */
const onResponseError = (response: any) => {
  return response
}

axios.interceptors.request.use(onRequestSuccess)
axios.interceptors.response.use(onResponseError)

export default axios
