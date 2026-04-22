/**
 * flexible rem 适配
 * max font-size = 40px
 * min font-size = 12px
 */

const DESIGN_WIDTH = 375
const MAX_FONT_SIZE = 40
const MIN_FONT_SIZE = 12

let timer = null
let inited = false

// 设置 rem 基准值
function setRem() {
  if (typeof window === 'undefined') return

  const doc = document.documentElement
  const clientWidth = doc.clientWidth

  if (!clientWidth) return

  // 基础计算（以 375 设计稿为基准）
  let fontSize = (clientWidth / DESIGN_WIDTH) * 16

  // 最大限制 40px
  fontSize = Math.min(fontSize, MAX_FONT_SIZE)

  // 最小限制 12px
  fontSize = Math.max(fontSize, MIN_FONT_SIZE)

  doc.style.fontSize = `${fontSize}px`
}

// 防抖，避免频繁调用 setRem
function debounceSetRem() {
  clearTimeout(timer)
  timer = setTimeout(setRem, 100)
}

// 初始化适配
export function initFlexible() {
  if (inited) return
  inited = true

  setRem()

  window.addEventListener('resize', debounceSetRem)
  window.addEventListener('orientationchange', setRem)
}

// 销毁适配，移除事件监听
export function destroyFlexible() {
  if (typeof window === 'undefined') return

  window.removeEventListener('resize', debounceSetRem)
  window.removeEventListener('orientationchange', setRem)

  clearTimeout(timer)
  inited = false
}
