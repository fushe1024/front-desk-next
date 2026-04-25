# 📦 fn-ui 组件库使用指南

`fn-ui` 是一个基于 Vue 3 的轻量级组件库，支持多种引入方式，适用于不同规模项目。

<img src="https://img.cdn1.vip/i/69ec7b981038f_1777105816.webp" alt="">

---

# 一、安装与基础使用

```bash
# 本地项目（直接使用）
import FnUI from '@/fn-ui'

# 未来发布 npm
npm install fn-ui
```

```js
import { createApp } from 'vue'
import App from './App.vue'
import FnUI from 'fn-ui'

const app = createApp(App)
app.use(FnUI)

app.mount('#app')
```

---

# 二、完整引入（Global）

适用于：中小项目 / 快速开发

## 使用方式

```js
import FnUI from 'fn-ui'

app.use(FnUI, {
  prefix: 'Fn' // 可选：组件前缀（默认 Fn）
})
```

---

## 使用示例

```vue
<FnButton type="primary">按钮</FnButton>
<FnSvgIcon name="edit" />
<FnPopup />
<FnSearch />
```

或：

```vue
<fn-button />
<fn-popup />
```

---

## 特点

- 无需手动 import
- 支持前缀统一管理
- 自动注册 PascalCase / kebab-case
- ⚠ 所有组件会被打包

---

# 三、按需引入（推荐）

适用于：中大型项目（性能更优）

---

## 使用方式

```js
import { Button, Popup } from 'fn-ui'

app.use(Button)
app.use(Popup)
```

---

## 使用示例

```vue
<Button type="primary">按钮</Button>
<Popup />
```

---

## 特点

- 只加载使用的组件
- 支持 tree-shaking
- 推荐使用方式

---

# 四、手动导入（局部使用）

适用于：组件内部 / 业务模块

---

## 使用方式

```vue
<script setup>
import { Button } from 'fn-ui'
</script>

<template>
  <Button>按钮</Button>
</template>
```

---

## 特点

- 仅当前组件生效
- 不污染全局
- 最灵活

---

# 五、自动按需导入（进阶）

适用于：大型项目 / 工程化

---

## 1️⃣ 安装插件

```bash
npm i unplugin-vue-components -D
```

---

## 2️⃣ 配置

```js
// vite.config.js
import Components from 'unplugin-vue-components/vite'

export default {
  plugins: [
    Components({
      resolvers: [
        (name) => {
          if (name.startsWith('Fn')) {
            return {
              name,
              from: 'fn-ui'
            }
          }
        }
      ]
    })
  ]
}
```

---

## 3️⃣ 使用

```vue
<FnButton />
<FnPopup />
```

---

## 特点

- 无需 import
- 无需 app.use
- 自动按需加载
- 最佳组件库体验

---

# 六、全局配置（Global Config）

```js
app.use(FnUI, {
  prefix: 'Fn',
  kebab: true
})
```

| 参数   | 类型    | 默认值 | 说明                |
| ------ | ------- | ------ | ------------------- |
| prefix | string  | `'Fn'` | 组件前缀            |
| kebab  | boolean | `true` | 是否注册 kebab-case |

---
