import router from '@/router'

// 路由守卫：权限守卫
export function setupPermissionGuard() {
  const whiteList = ['/login', '/404', '/401']

  // 前置守卫
  router.beforeEach(() => {})

  // 后置守卫
  router.afterEach(() => {})
}
