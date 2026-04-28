<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'

defineOptions({
  name: 'Popover',
  inheritAttrs: false
})

const props = defineProps({
  content: String,
  title: String,
  trigger: {
    type: String,
    default: 'hover' // hover | click | focus | contextmenu
  },
  placement: {
    type: String,
    default: 'bottom' // top-start / bottom-end ...
  },
  width: {
    type: [String, Number]
  },
  color: {
    type: String
  },
  hideAfter: {
    type: Number,
    default: 100
  },
  showAfter: {
    type: Number,
    default: 0
  }
})

const visible = ref(false)
const triggerRef = ref(null)
const popRef = ref(null)

// 定时器
let showTimer = null
let hideTimer = null

// 清除定时器
const clearTimers = () => {
  clearTimeout(showTimer)
  clearTimeout(hideTimer)
}

// 显示气泡
const show = () => {
  clearTimers()
  showTimer = setTimeout(() => {
    visible.value = true
  }, props.showAfter)
}

// 隐藏气泡
const hide = () => {
  clearTimers()
  hideTimer = setTimeout(() => {
    visible.value = false
  }, props.hideAfter)
}

// 显示/隐藏气泡
const toggle = () => {
  visible.value ? hide() : show()
}

// 气泡位置
const placementClass = computed(() => {
  const [direction, align = 'center'] = props.placement.split('-')

  // 是否水平放置（top/bottom）还是垂直放置（left/right）
  const isHorizontal = direction === 'top' || direction === 'bottom'

  const base = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  }

  const alignMap = {
    start: isHorizontal ? 'left-0' : 'top-0',
    end: isHorizontal ? 'right-0' : 'bottom-0',
    center: isHorizontal ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2'
  }

  return `${base[direction]} ${alignMap[align]}`
})

// 绑定事件
const triggerEvents = computed(() => {
  const map = {
    hover: {
      onMouseenter: show,
      onMouseleave: hide
    },
    click: {
      onClick: toggle
    },
    focus: {
      onFocus: show,
      onBlur: hide
    },
    contextmenu: {
      onContextmenu: (e) => {
        e.preventDefault()
        toggle()
      }
    }
  }

  return map[props.trigger]
})

// 鼠标进入气泡时取消隐藏
const onPopEnter = () => {
  if (props.trigger === 'hover') {
    clearTimeout(hideTimer)
  }
}

// 鼠标离开气泡时重新设置隐藏
const onPopLeave = () => {
  if (props.trigger === 'hover') {
    hide()
  }
}

// 计算气泡样式
const popStyle = computed(() => ({
  ...(props.color && { backgroundColor: props.color }),
  ...(props.width && { width: typeof props.width === 'number' ? `${props.width}px` : props.width })
}))

// 点击外部关闭
const handleClickOutside = (e) => {
  // 触发元素和气泡元素不包含点击的元素，则关闭气泡
  if (!triggerRef.value?.contains(e.target) && !popRef.value?.contains(e.target)) {
    hide()
  }
}

let clickListenerBound = false

// 只有在气泡可见时才绑定事件
watch(visible, (newValue) => {
  if (newValue && !clickListenerBound) {
    // 气泡显示，绑定事件
    document.addEventListener('click', handleClickOutside)
    clickListenerBound = true
  } else {
    // 气泡隐藏，移除事件
    document.removeEventListener('click', handleClickOutside)
    clickListenerBound = false
  }
})

// 组件销毁时移除事件
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative">
    <div ref="triggerRef" v-bind="triggerEvents">
      <slot name="reference" />
    </div>

    <transition name="fade">
      <div
        v-show="visible"
        ref="popRef"
        class="absolute z-50"
        :class="placementClass"
        @mouseenter="onPopEnter"
        @mouseleave="onPopLeave"
      >
        <div
          class="rounded-xl border border-zinc-200 bg-white p-3 text-sm whitespace-nowrap dark:border-zinc-700 dark:bg-zinc-900"
          :style="popStyle"
          v-bind="$attrs"
        >
          <div v-if="title" class="mb-1 font-semibold">
            {{ title }}
          </div>

          <div v-if="content">
            {{ content }}
          </div>

          <slot v-else />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
