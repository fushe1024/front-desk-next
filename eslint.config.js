import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js}']
  },

  globalIgnores(['**/dist/**', '**/node_modules/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,

  {
    rules: {
      'no-var': 'error',
      'no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off'
    }
  }
])
