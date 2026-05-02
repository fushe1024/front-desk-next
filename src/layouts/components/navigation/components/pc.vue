<script setup>
import { ref } from 'vue'
import { useDragScroll } from '@/composables/useDragScroll'

defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['child-click'])

const activeIndex = ref(0)

const { scrollRef, isDragging } = useDragScroll()

// 切换项
const handleCategoryClick = (index) => {
  if (isDragging.value) return

  activeIndex.value = index
  emit('child-click', index)
}
</script>

<template>
  <div class="sticky top-0 left-0 z-10 w-full bg-white transition-colors dark:bg-zinc-800">
    <div class="m-auto w-7xl">
      <ul
        ref="scrollRef"
        class="no-scrollbar h-navigation flex w-full items-center overflow-x-auto select-none"
        :class="{ 'active:cursor-grabbing': isDragging }"
      >
        <li
          class="relative mx-4 shrink-0 cursor-pointer font-semibold whitespace-nowrap text-zinc-900 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-zinc-900 after:opacity-0 after:transition-opacity after:duration-300 after:content-[''] hover:text-zinc-600 dark:text-zinc-400 dark:after:bg-white dark:hover:text-zinc-200"
          :class="{
            'text-zinc-900 dark:text-white': activeIndex === index,
            'after:opacity-100': activeIndex === index,
            'active:cursor-grabbing': isDragging
          }"
          v-for="(item, index) in data"
          :key="item.id"
          @click="handleCategoryClick(index, $event)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
