import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useCategoryStore } from './modules/category'
import { useAppStore } from './modules/app'

// 创建 store
const store = createPinia()

// 持久化插件
store.use(piniaPluginPersistedstate)

// 注册函数
export function setupStore(app) {
  app.use(store)
}

// 导出
export { useCategoryStore, useAppStore }
export default store
