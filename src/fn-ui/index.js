// fn-ui/index.js
import Button from './button'
import SvgIcon from './svg-icon'
import Popup from './popup'
import Popover from './popover'
import Search from './search'

// 所有组件
const components = [Button, SvgIcon, Popup, Popover, Search]

// 工具函数：转 kebab-case
function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export default {
  install(app, options = {}) {
    const {
      prefix = 'Fn', // 前缀（Fn）
      kebab = false // 是否注册 kebab-case
    } = options

    components.forEach((comp) => {
      if (!comp.name) return

      // PascalCase：FnButton
      const name = prefix + comp.name
      app.component(name, comp)

      // kebab-case：fn-button
      if (kebab) {
        const kebabName = toKebabCase(name)
        if (kebabName !== name) {
          app.component(kebabName, comp)
        }
      }
    })
  }
}

// 支持按需引入
export { Button, SvgIcon, Popup, Popover, Search }
