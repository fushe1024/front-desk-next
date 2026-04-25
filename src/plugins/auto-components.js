import { defineAsyncComponent } from 'vue'

/**
 * 转换字符串为 PascalCase
 * 支持：kebab-case / snake_case / camelCase
 * 例：svg-icon -> SvgIcon
 */
function toPascalCase(str) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(/\s+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('')
}

/**
 * 根据文件路径获取组件名
 * index.vue 使用父目录名
 */
function getComponentName(path) {
  const normalized = path.replace(/\\/g, '/') // 兼容 Windows 路径分隔符
  const parts = normalized.split('/')
  const file = parts.pop().replace('.vue', '')

  return file === 'index' ? parts.pop() : file
}

export default {
  install(app, options = {}) {
    const { prefix = '' } = options
    // 自动扫描组件
    const modules = import.meta.glob('../components/**/*.vue')

    // 防止重复注册
    const registered = new Set()

    Object.entries(modules).forEach(([filePath, loader]) => {
      const rawName = getComponentName(filePath)
      // 组件名 = 前缀 + PascalCase(文件名)
      const componentName = prefix + toPascalCase(rawName)

      if (registered.has(componentName)) return

      // 定义异步组件
      const component = defineAsyncComponent(loader)

      app.component(componentName, component)

      registered.add(componentName)
    })
  }
}
