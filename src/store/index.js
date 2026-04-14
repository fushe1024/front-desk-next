import { createPinia } from 'pinia'

const store = createPinia()

export function setupStore(app) {
  app.use(store)
}

// 导出pinia实例
export default store
