import axios from 'axios'

// 创建实例
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    config.headers.icode = 'helloqianduanxunlianying'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 响应数据处理
    const { data, message, success } = response.data

    // 请求成功
    if (success) {
      return data
    } else {
      return Promise.reject(message)
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
