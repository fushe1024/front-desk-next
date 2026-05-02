import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useDragScroll(options = {}) {
  const {
    threshold = 5 // 拖拽判定阈值
  } = options

  // 滚动元素引用
  const scrollRef = ref(null)

  // 是否正在拖拽
  const isDragging = ref(false)

  let isDown = false
  let startX = 0
  let startScrollLeft = 0

  // 鼠标按下事件
  const onMouseDown = (e) => {
    const el = scrollRef.value
    if (!el) return

    isDown = true
    isDragging.value = false
    startX = e.pageX
    startScrollLeft = el.scrollLeft
  }

  // 鼠标移动事件
  const onMouseMove = (e) => {
    const el = scrollRef.value
    if (!el || !isDown) return

    const dx = e.pageX - startX

    if (Math.abs(dx) > threshold) {
      isDragging.value = true
    }

    el.scrollLeft = startScrollLeft - dx
  }

  // 鼠标松开事件
  const onMouseUp = () => {
    isDown = false
  }

  // 组件挂载时添加事件监听
  onMounted(() => {
    const el = scrollRef.value
    if (!el) return

    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  })

  // 组件卸载时移除事件监听
  onBeforeUnmount(() => {
    const el = scrollRef.value
    if (!el) return

    el.removeEventListener('mousedown', onMouseDown)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  })

  return {
    scrollRef,
    isDragging
  }
}
