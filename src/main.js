import { createApp } from 'vue'
import App from './App.vue'

// style
import './index.css'

// core
import store from './store'
import router from './router'

// permission
import { setupPermissionGuard } from './router/guards/permission'

// 创建 app
const app = createApp(App)

// 核心配置
app.use(store)
app.use(router)

// 守卫
setupPermissionGuard()

// 挂载 app
app.mount('#app')
