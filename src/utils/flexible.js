import { isMobileTerminal } from './device'
/**
 * flexible rem 适配（仅移动端生效）
 * max font-size = 40px
 * min font-size = 12px
 */

const DESIGN_WIDTH = 375
const MAX_FONT_SIZE = 40
const MIN_FONT_SIZE = 12

let timer = null
let inited = false

// 设置 rem
const setRem = () => {
  if (typeof window === 'undefined') return

  const doc = document.documentElement

  // 👉 PC 直接清除 fontSize（关键）
  if (!isMobileTerminal.value) {
    doc.style.fontSize = ''
    return
  }

  const width = doc.clientWidth

  if (!width) return

  let fontSize = (width / DESIGN_WIDTH) * 16

  fontSize = Math.min(fontSize, MAX_FONT_SIZE)
  fontSize = Math.max(fontSize, MIN_FONT_SIZE)

  doc.style.fontSize = `${fontSize}px`
}

// 防抖
const debounceSetRem = () => {
  clearTimeout(timer)
  timer = setTimeout(setRem, 100)
}

// 初始化
export const initFlexible = () => {
  if (inited) return
  inited = true

  setRem()

  window.addEventListener('resize', debounceSetRem)
  window.addEventListener('orientationchange', setRem)
}

// 销毁
export const destroyFlexible = () => {
  if (typeof window === 'undefined') return

  window.removeEventListener('resize', debounceSetRem)
  window.removeEventListener('orientationchange', setRem)

  clearTimeout(timer)

  // 👉 恢复默认（重要）
  document.documentElement.style.fontSize = ''

  inited = false
}
