<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['child-click'])

const ulRef = ref(null)
const activeIndex = ref(0)
const itemRefs = ref([])

const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '0px'
})

const setItemRef = (el, index) => {
  if (el) itemRefs.value[index] = el
}

// 更新滑块位置和宽度
function updateSlider() {
  const el = itemRefs.value[activeIndex.value]
  const ul = ulRef.value

  if (!ul || !el) return

  const elRect = el.getBoundingClientRect()
  const ulRect = ul.getBoundingClientRect()

  // 获取元素在 ul 中的位置
  const left = ul.scrollLeft + elRect.left - ulRect.left

  // 设置滑块样式
  sliderStyle.value = {
    transform: `translateX(${left}px)`,
    width: elRect.width + 'px'
  }

  // 滚动到可见区域
  // el?.scrollIntoView({
  //   behavior: 'smooth',
  //   inline: 'center'
  // })
}

// 处理分类点击事件
const handleCategoryClick = (index) => {
  if (activeIndex.value === index) return
  activeIndex.value = index
}

// 监听 activeIndex 变化，更新滑块位置
watch(activeIndex, async () => {
  await nextTick()
  updateSlider()
})

// 监听数据变化，重置 refs 和 activeIndex 并更新滑块位置
watch(
  () => props.data,
  async () => {
    itemRefs.value = []
    activeIndex.value = 0
    await nextTick()
    updateSlider()
  },
  { immediate: true }
)

// 监听元素尺寸变化
onMounted(() => {
  const resizeObserver = new ResizeObserver(updateSlider)
  resizeObserver.observe(document.documentElement)
})

const isVisible = ref(false)

// 处理弹层分类点击事件
const changeItem = (index) => {
  emit('child-click', index)
  isVisible.value = false
}
</script>

<template>
  <div class="sticky top-0 z-10 bg-white p-2">
    <ul ref="ulRef" class="no-scrollbar relative flex overflow-x-auto text-xs text-zinc-600">
      <!-- 滑块 -->
      <li
        class="absolute top-1/2 h-6 -translate-y-1/2 rounded-full bg-zinc-900 duration-200"
        :style="sliderStyle"
      />

      <!-- 分类项 -->
      <li
        v-for="(item, index) in data"
        :key="item.id"
        :ref="(el) => setItemRef(el, index)"
        class="z-10 shrink-0 px-2.5 py-2 whitespace-nowrap duration-200 last:mr-8"
        :class="{ 'text-zinc-100': activeIndex === index }"
        @click="handleCategoryClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>

    <!-- 弹层按钮 -->
    <div
      class="shadow-l-white absolute top-1/2 right-0 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-white"
      @click="isVisible = true"
    >
      <fn-svg-icon name="hamburger" size="16" class="duration-200 active:scale-90" />
    </div>

    <!-- 弹层组件 -->
    <fn-popup v-model="isVisible">
      <div class="flex h-[80vh] flex-col p-2">
        <h2 class="mx-1.5 mb-1.5 text-xl font-bold text-zinc-900">所有分类</h2>
        <ul class="flex-1 overflow-y-auto">
          <li
            class="mx-1.5 rounded-sm py-2 text-lg text-zinc-900 active:bg-zinc-100"
            v-for="(item, index) in data"
            :key="item.id"
            @click="changeItem(index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </fn-popup>
  </div>
</template>

<style scoped></style>
