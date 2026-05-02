import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'

// style
import './styles/index.css'

// core
import store from './store'
import router from './router'
import directives from './directives'

// 导入 FnUI 组件库
import FnUI from './fn-ui'

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
app.use(directives)

// 安装 FnUI
app.use(FnUI)

// 守卫
setupPermissionGuard()

// 挂载 app
app.mount('#app')
