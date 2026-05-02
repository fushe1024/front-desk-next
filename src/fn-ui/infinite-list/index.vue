<script setup>
import SvgIcon from '../svg-icon/index.vue'
import { useIntersectionObserver } from '@vueuse/core'
import { ref, watch } from 'vue'

defineOptions({
  name: 'InfiniteList'
})

const isLoading = defineModel({
  type: Boolean,
  default: false
})

const props = defineProps({
  isFinished: {
    type: Boolean,
    default: false
  },
  distance: {
    type: Number,
    default: 0 // 提前触发距离
  }
})

const emit = defineEmits(['loadMore'])

const loadingRef = ref(null)

// 是否允许触发
const canTrigger = ref(true)

const { stop, resume } = useIntersectionObserver(
  loadingRef,
  ([entry]) => {
    if (!entry?.isIntersecting) return

    // 关键控制逻辑
    if (props.isFinished || isLoading.value || !canTrigger.value) return

    canTrigger.value = false
    emit('loadMore')
  },
  {
    rootMargin: `0px 0px ${props.distance}px 0px`
  }
)

// 当 loading 结束后，允许再次触发
watch(isLoading, (val) => {
  if (!val) {
    canTrigger.value = true
  }
})

// 加载完成后停止监听
watch(
  () => props.isFinished,
  (val) => {
    if (val) {
      stop()
    } else {
      resume()
    }
  }
)
</script>

<template>
  <div>
    <slot />

    <div ref="loadingRef" class="flex min-h-10 items-center justify-center py-4">
      <!-- loading -->
      <svg-icon v-show="isLoading" name="infinite-load" :size="24" class="animate-spin" />

      <!-- finished -->
      <span v-if="isFinished" class="text-sm text-zinc-500"> 已经没有更多了 </span>
    </div>
  </div>
</template>
