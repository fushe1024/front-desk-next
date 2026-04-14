import http from '@/utils/request'

export const getCategory = () => {
  return http.get('/category')
}
