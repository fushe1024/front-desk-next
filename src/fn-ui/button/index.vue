<script setup>
import { computed } from 'vue'
import { typeEnum, sizeEnum } from './config'
import SvgIcon from '../svg-icon'

defineOptions({
  name: 'Button',
  inheritAttrs: false
})

const props = defineProps({
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'default'
  },
  activeAnime: {
    type: Boolean,
    default: false
  },
  icon: String,
  loading: Boolean,
  disabled: Boolean,
  round: Boolean,
  circle: Boolean
})

const emit = defineEmits(['click'])

const isDisabled = computed(() => props.disabled || props.loading)
const iconSize = computed(() => sizeEnum[props.size].icon)

// 圆形按钮自动尺寸
const circleSize = computed(() => {
  const size = sizeEnum[props.size].button
  if (size.includes('h-7')) return 'h-7 w-7'
  if (size.includes('h-11')) return 'h-11 w-11'
  return 'h-9 w-9'
})

const handleClick = (e) => {
  if (isDisabled.value) return
  emit('click', e)
}
</script>

<template>
  <button
    type="button"
    :disabled="isDisabled"
    @click="handleClick"
    class="flex cursor-pointer items-center justify-center font-semibold whitespace-nowrap transition-transform select-none"
    :class="[
      typeEnum[type],
      !circle && sizeEnum[size].button,
      round && 'rounded-full',
      circle ? [circleSize, 'rounded-full p-0'] : 'rounded',
      isDisabled && 'pointer-events-none cursor-not-allowed opacity-60',
      activeAnime && !isDisabled && 'duration-200 active:scale-95'
    ]"
    v-bind="$attrs"
  >
    <SvgIcon v-if="loading" name="loading" class="shrink-0 animate-spin" :size="iconSize" />

    <SvgIcon v-else-if="icon" :name="icon" class="shrink-0" :size="iconSize" />

    <span v-if="$slots.default" :class="{ 'ml-2': icon || loading }">
      <slot />
    </span>
  </button>
</template>
