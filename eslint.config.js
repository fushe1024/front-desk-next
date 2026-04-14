import { defineConfig } from 'eslint/config' // 核心
import js from '@eslint/js' // 官方规则
import vue from 'eslint-plugin-vue' // Vue 规则
import vueParser from 'vue-eslint-parser' //  解析 .vue
import prettierConfig from 'eslint-config-prettier' // 关闭冲突规则
import prettierPlugin from 'eslint-plugin-prettier' // ESLint 运行 prettier
import globals from 'globals'

export default defineConfig([
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  prettierConfig,
  {
    files: ['**/*.js', '**/*.vue'],
    ignores: ['dist', 'node_modules'],

    // 语言选项
    languageOptions: {
      parser: vueParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },

    // 添加 prettier 插件
    plugins: {
      prettier: prettierPlugin
    },

    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off'
    }
  }
])
