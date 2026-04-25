<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'SvgIcon',
  inheritAttrs: false
})

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String]
  },
  color: {
    type: String
  }
})

const isLocal = computed(() => {
  return !props.name.startsWith('http') && !props.name.includes('/')
})

const symbolId = computed(() => `#icon-${props.name}`)

// 只有传了 size 才生成宽高样式，否则不干预，让 CSS 接管
const sizeStyle = computed(() => {
  if (!props.size && props.size === 0) return {}

  const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size
  return {
    width: sizeValue,
    height: sizeValue
  }
})

const localStyle = computed(() => {
  const style = { ...sizeStyle.value }
  if (props.color) style.fill = props.color
  return style
})

const externalStyle = computed(() => {
  const style = { ...sizeStyle.value }
  if (props.color) style.backgroundColor = props.color
  style.mask = `url(${props.name}) no-repeat 50% 50%`
  style.WebkitMask = `url(${props.name}) no-repeat 50% 50%`
  style.maskSize = 'contain'
  style.WebkitMaskSize = 'contain'
  return style
})
</script>

<template>
  <svg
    v-if="isLocal"
    class="svg-icon"
    :style="localStyle"
    :focusable="false"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <use :href="symbolId" />
  </svg>

  <span v-else class="svg-icon" v-bind="$attrs" :style="externalStyle" />
</template>

<style scoped>
/* 基础布局，不影响尺寸优先级 */
.svg-icon {
  display: inline-block;
  vertical-align: -0.15em;
  flex-shrink: 0;
}
</style>
