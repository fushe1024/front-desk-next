export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/pins',
    name: 'pins',
    component: () => import('@/views/pins/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/index.vue')
  }
]
