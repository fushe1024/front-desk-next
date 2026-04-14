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
    const { data } = response.data
    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
