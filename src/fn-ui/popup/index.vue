<script setup>
import { computed, watch, onBeforeUnmount } from 'vue'
import { useScrollLock } from '@vueuse/core'

defineOptions({
  name: 'Popup',
  inheritAttrs: false
})

const visible = defineModel({
  type: Boolean,
  default: false
})

const props = defineProps({
  position: {
    type: String,
    default: 'bottom',
    validator: (v) => ['top', 'bottom', 'left', 'right', 'center'].includes(v)
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  showCloseButton: {
    type: Boolean,
    default: false
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  closeOnPopstate: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['open', 'close'])

// 滚动锁
const isLocked = useScrollLock(document.body)

// 关闭
const close = () => {
  visible.value = false
}

// 点击遮罩关闭
const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) close()
}

// 监听浏览器后退事件
const handlePopstate = () => {
  close()
}

// 位置
const positionClass = computed(() => {
  const map = {
    bottom: 'bottom-0 left-0 right-0 max-h-[80dvh] rounded-t-2xl',
    top: 'top-0 left-0 right-0 max-h-[80dvh] rounded-b-2xl',
    center: 'left-1/2 top-1/2 max-w-lg max-h-[80dvh] -translate-x-1/2 -translate-y-1/2 rounded-2xl',
    left: 'left-0 top-0 bottom-0 w-3/4 rounded-r-2xl',
    right: 'right-0 top-0 bottom-0 w-3/4 rounded-l-2xl'
  }

  return map[props.position] || map.bottom
})

// 动画
const transitionName = computed(() => {
  const map = {
    bottom: 'popup-bottom',
    top: 'popup-top',
    center: 'popup-center',
    left: 'popup-left',
    right: 'popup-right'
  }

  return map[props.position] || 'popup-bottom'
})

// 监听 visible 变化
watch(
  visible,
  (val) => {
    if (val) {
      if (props.lockScroll) isLocked.value = true
      emit('open')

      if (props.closeOnPopstate) {
        window.addEventListener('popstate', handlePopstate)
      }
    } else {
      isLocked.value = false
      emit('close')

      if (props.closeOnPopstate) {
        window.removeEventListener('popstate', handlePopstate)
      }
    }
  },
  { immediate: true }
)

// 销毁前清理
onBeforeUnmount(() => {
  isLocked.value = false
  window.removeEventListener('popstate', handlePopstate)
})
</script>

<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed inset-0 z-50">
      <transition name="fade">
        <div
          v-if="visible"
          class="pointer-events-auto absolute inset-0 bg-zinc-900/70"
          @click="handleOverlayClick"
        />
      </transition>

      <transition :name="transitionName">
        <div
          v-if="modelValue"
          class="pointer-events-auto absolute bg-white"
          :class="positionClass"
          v-bind="$attrs"
        >
          <slot />

          <button v-if="showCloseButton" class="absolute top-2 right-3" @click="close">✕</button>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<style scoped>
/* overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* bottom */
.popup-bottom-enter-active,
.popup-bottom-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  will-change: transform; /* 提升性能 */
}

.popup-bottom-enter-from,
.popup-bottom-leave-to {
  transform: translate3d(0, 100%, 0);
}

/* top */
.popup-top-enter-active,
.popup-top-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  will-change: transform;
}

.popup-top-enter-from,
.popup-top-leave-to {
  transform: translate3d(0, -100%, 0);
}

/* left */
.popup-left-enter-active,
.popup-left-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  will-change: transform;
}

.popup-left-enter-from,
.popup-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

/* right */
.popup-right-enter-active,
.popup-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  will-change: transform;
}

.popup-right-enter-from,
.popup-right-leave-to {
  transform: translate3d(100%, 0, 0);
}

/* center */
.popup-center-enter-active,
.popup-center-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.popup-center-enter-from,
.popup-center-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.92);
}

.popup-center-enter-to,
.popup-center-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
</style>
