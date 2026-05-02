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

function updateSlider() {
  const el = itemRefs.value[activeIndex.value]
  const ul = ulRef.value

  if (!ul || !el) return

  const elRect = el.getBoundingClientRect()
  const ulRect = ul.getBoundingClientRect()

  const left = ul.scrollLeft + elRect.left - ulRect.left

  sliderStyle.value = {
    transform: `translateX(${left}px)`,
    width: elRect.width + 'px'
  }
}

watch(activeIndex, async () => {
  await nextTick()
  updateSlider()
})

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

onMounted(() => {
  const resizeObserver = new ResizeObserver(updateSlider)
  resizeObserver.observe(document.documentElement)
})

const isVisible = ref(false)

const changeItem = (index) => {
  if (activeIndex.value === index) return
  activeIndex.value = index
  emit('child-click', index)
  isVisible.value = false
}
</script>

<template>
  <!-- 顶部容器 -->
  <div
    class="sticky top-0 left-0 z-50 border-b border-transparent bg-white p-2 dark:border-zinc-800 dark:bg-zinc-900"
  >
    <ul
      ref="ulRef"
      class="no-scrollbar relative flex overflow-x-auto text-xs text-zinc-600 dark:text-zinc-400"
    >
      <!-- 滑块 -->
      <li
        class="absolute top-1/2 h-6 -translate-y-1/2 rounded-full bg-zinc-900 transition-all duration-200 dark:bg-zinc-100"
        :style="sliderStyle"
      />

      <!-- 分类项 -->
      <li
        v-for="(item, index) in data"
        :key="item.id"
        :ref="(el) => setItemRef(el, index)"
        class="z-10 shrink-0 cursor-pointer px-2.5 py-2 font-medium whitespace-nowrap transition-colors duration-200 last:mr-8"
        :class="
          activeIndex === index
            ? 'text-zinc-100 dark:text-zinc-900'
            : 'text-zinc-900 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-100'
        "
        @click="changeItem(index)"
      >
        {{ item.name }}
      </li>
    </ul>

    <!-- 右侧按钮 -->
    <div
      class="shadow-l-white dark:shadow-l-black absolute top-1/2 right-0 z-20 flex h-full w-8 -translate-y-1/2 items-center justify-center bg-white dark:bg-zinc-950"
      @click="isVisible = true"
    >
      <fn-svg-icon
        name="hamburger"
        :size="16"
        class="fill-zinc-800 active:scale-90 dark:fill-zinc-200"
      />
    </div>

    <!-- 弹层 -->
    <fn-popup v-model="isVisible">
      <div class="flex h-[80vh] flex-col bg-white p-2 dark:bg-zinc-900">
        <h2 class="mx-1.5 mb-1.5 text-xl font-bold text-zinc-900 dark:text-zinc-100">所有分类</h2>

        <ul class="flex-1 overflow-y-auto">
          <li
            v-for="(item, index) in data"
            :key="item.id"
            class="mx-1.5 rounded-md py-2 text-lg text-zinc-900 transition-colors duration-200 active:bg-zinc-100 dark:text-zinc-300 dark:active:bg-zinc-800"
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
