import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'

// style
import './styles/index.css'

// core
import store from './store'
import router from './router'
import autoComponents from './plugins/auto-components'

// permission
import { setupPermissionGuard } from './router/guards/permission'

// 初始化适配
import { initFlexible } from '@/utils/flexible'
initFlexible()

// 创建 app
const app = createApp(App)

// 核心配置
app.use(store)
app.use(router)

// 插件
app.use(autoComponents, {
  prefix: 'Fn'
})

// 守卫
setupPermissionGuard()

// 挂载 app
app.mount('#app')

console.log(app._context.components)
