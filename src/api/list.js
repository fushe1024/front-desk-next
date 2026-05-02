import http from '@/utils/request'

export const getList = (params) => {
  return http.get('/pexels/list', { params })
}
