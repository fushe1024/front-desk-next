import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { ThemeMode } from '@/enums'
import { applyTheme, onSystemThemeChange } from '@/utils/theme'

export const useAppStore = defineStore('app', () => {
  const themeMode = ref(ThemeMode.SYSTEM)

  const setThemeMode = (mode) => {
    themeMode.value = mode
  }

  // 监听主题
  watch(
    themeMode,
    (mode) => {
      applyTheme(mode)
    },
    { immediate: true }
  )

  // 监听系统主题
  onSystemThemeChange(() => {
    if (themeMode.value === ThemeMode.SYSTEM) {
      applyTheme(themeMode.value)
    }
  })

  return {
    themeMode,
    setThemeMode
  }
})
