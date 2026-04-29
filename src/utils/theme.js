import { ThemeMode } from '@/enums'

const mql = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null

/* ----------------------------- DOM 操作 ----------------------------- */
/**
 * 切换暗黑模式 class（作用于 html 根节点）
 * @param {boolean} isDark 是否启用暗黑模式
 */
export function toggleDarkMode(isDark) {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  root.classList.toggle('dark', isDark)
}

/* ----------------------------- 主题核心逻辑 ----------------------------- */
/**
 * 根据主题模式计算并应用当前主题
 * @param {ThemeMode} mode 当前主题模式（light / dark / system）
 *
 * system 模式下会根据系统颜色模式自动判断
 */
export function applyTheme(mode) {
  if (!mql) return

  const isDark = mode === ThemeMode.DARK || (mode === ThemeMode.SYSTEM && mql.matches)

  toggleDarkMode(isDark)
}

/* -------------------------- 系统主题监听 -------------------------- */
/**
 * 监听系统主题变化（仅初始化一次）
 *
 * 注意：
 * - 仅在 SYSTEM 模式下使用更有意义
 * - 内部只负责监听注册，不处理业务逻辑
 *
 * @param {(isDark: boolean) => void} callback 系统主题变化回调
 */
let inited = false

export function onSystemThemeChange(callback) {
  if (!mql || inited) return
  inited = true

  const handler = (e) => {
    callback(e.matches)
  }

  // 新版浏览器 API
  mql.addEventListener?.('change', handler)

  // 旧版兼容 API
  mql.addListener?.(handler)
}
