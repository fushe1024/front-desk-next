import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export function setupRouter(app) {
  app.use(router)
}

// 导出
export default router
