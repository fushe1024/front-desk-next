<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** 图标名称：本地图标名（不含 #icon- 前缀）或外部 URL */
  name: {
    type: String,
    required: true
  },
  /** 尺寸：数字(px)或字符串(如 '2rem', '32px') */
  size: {
    type: [Number, String],
    default: 24
  },
  /** 颜色值（如 '#ff0000'、'red'），优先级高于 Tailwind 类。留空则完全由 className 控制 */
  color: {
    type: String,
    default: ''
  },
  /** 自定义 CSS 类（推荐使用 Tailwind 工具类，如 fill-red-500、text-blue-600 等） */
  className: {
    type: String,
    default: ''
  }
})

// 判断是否为本地图标
const isLocal = computed(() => {
  return !props.name.startsWith('http') && !props.name.includes('/')
})

// 本地图标的 symbol id
const symbolId = computed(() => `#icon-${props.name}`)

// 统一处理尺寸
const sizeStyle = computed(() => {
  const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size
  return {
    width: sizeValue,
    height: sizeValue
  }
})

// 本地 SVG 样式：只设置尺寸和颜色（如果 color prop 有值）
const localStyle = computed(() => {
  const style = { ...sizeStyle.value }
  if (props.color) {
    style.fill = props.color
  }
  return style
})

// 外部 SVG（mask）样式：尺寸 + 背景色（如果 color prop 有值，否则用 currentColor）
const externalStyle = computed(() => {
  const style = { ...sizeStyle.value }
  // 背景色决定图标颜色
  style.backgroundColor = props.color || 'currentColor'
  // mask 属性引用外部 SVG
  style.mask = `url(${props.name}) no-repeat 50% 50%`
  style.WebkitMask = `url(${props.name}) no-repeat 50% 50%`
  style.maskSize = 'contain'
  style.WebkitMaskSize = 'contain'
  return style
})
</script>

<template>
  <!-- 本地 SVG -->
  <svg
    v-if="isLocal"
    class="svg-icon"
    :class="className"
    :style="localStyle"
    :focusable="false"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" :href="symbolId" />
  </svg>

  <!-- 外部 SVG-->
  <span v-else class="svg-icon" :class="className" :style="externalStyle" />
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: -0.15em;
  flex-shrink: 0;
}
</style>
