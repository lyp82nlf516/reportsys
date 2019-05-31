/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import { base } from '@/utils/mUtils.js'
// import qs from 'qs'
// import 'es6-promise'

// axios.defaults.baseURL = '/api'
// const proxyTable = process.env.NODE_ENV === 'development' ? '/api' : ''
// const basefild = 'cbs-report'
// const orgbase = `${proxyTable}/${basefild}`

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api'
  // axios.defaults.baseURL = ''
} else {
  axios.defaults.baseURL = base
}

// 请求超时时间
axios.defaults.timeout = 10000000000

// post请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(config => {
  // console.log('config:', config)
  return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
  // console.log('response:', response)
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
})

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
