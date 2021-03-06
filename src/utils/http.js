import axios from 'axios'
// eslint-disable-next-line no-unused-vars

const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? `/java` : '/apis',
  baseURL: 'http://127.0.0.1:9090',
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      // 'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
      'X-Powered-By': '3.2.1',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
      'Access-Control-Allow-Origin': '*'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
      // 'X-Powered-By': '3.2.1',
      // 'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      // 'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
      // 'Access-Control-Allow-Origin': '*'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    }
  },
  // 是否跨站点访问控制请求
  withCredentials: true,
  timeout: 30000,
  transformRequest: [(data) => {
    data = JSON.stringify(data)
    return data
  }],
  validateStatus () {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true
  },
  transformResponse: [(data) => {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }]
})
// 请求拦截器
service.interceptors.request.use((config) => {
  return config
}, (error) => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '服务器异常，请联系管理员！'
  return Promise.resolve(error)
})
const showStatus = (status) => {
  let message = ''
  // 这一坨代码可以使用策略模式进行优化
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}
service.interceptors.response.use((response) => {
  const status = response.status
  let msg = ''
  if (status < 200 || status >= 300) {
    // 处理http错误，抛到业务代码
    msg = showStatus(status)
    if (typeof response.data === 'string') {
      response.data = {msg}
    } else {
      response.data.msg = msg
    }
  }
  return response
}, (error) => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
  return Promise.resolve(error)
})
