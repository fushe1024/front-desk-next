<script setup>
import { ref } from 'vue'
import { getRandomSoftColor } from '@/utils/color'

const props = defineProps({
  data: {
    type: Object
  }
})

// 图片加载状态
const loaded = ref(false)

// 颜色缓存（避免反复变化）
const colorMap = new Map()

const getColor = (id) => {
  if (!colorMap.has(id)) {
    colorMap.set(id, getRandomSoftColor())
  }
  return colorMap.get(id)
}

const handleLoad = () => {
  loaded.value = true
}
</script>

<template>
  <div
    class="w-full rounded-md border border-transparent bg-white transition-all duration-300 hover:shadow-lg dark:border-zinc-700/50 dark:bg-zinc-800 dark:hover:shadow-black/30"
  >
    <!-- 图片区域 -->
    <div
      class="group relative overflow-hidden rounded-md"
      :style="{
        background: getColor(data.id),
        height: data.realHeight + 'px'
      }"
    >
      <!-- 占位层（骨架） -->
      <div
        v-if="!loaded"
        class="absolute inset-0 animate-pulse"
        :style="{ background: getColor(data.id) }"
      />

      <!-- 图片 -->
      <img
        v-lazy="data.photo"
        @load="handleLoad"
        class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        :class="loaded ? 'opacity-100' : 'opacity-0'"
      />

      <!-- 遮罩 -->
      <div
        class="absolute inset-0 cursor-zoom-in rounded-md bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-black/50"
      >
        <!-- 左上 -->
        <fn-button
          type="info"
          class="absolute top-2.5 left-2.5 h-10 w-10 rounded-xl dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          <fn-svg-icon name="heart" :size="16" class="fill-zinc-800 dark:fill-zinc-300" />
        </fn-button>

        <!-- 右上 -->
        <fn-button round type="main" size="large" class="absolute top-2.5 right-2.5 font-semibold">
          分享
        </fn-button>

        <!-- 左下 -->
        <fn-button
          type="info"
          class="absolute bottom-2.5 left-2.5 w-9 rounded-xl dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          <fn-svg-icon name="download" :size="16" class="fill-zinc-800 dark:fill-zinc-300" />
        </fn-button>

        <!-- 右下 -->
        <fn-button
          type="info"
          class="absolute right-2.5 bottom-2.5 w-9 rounded-xl dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          <fn-svg-icon name="full" :size="16" class="fill-zinc-800 dark:fill-zinc-300" />
        </fn-button>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="mt-1.5 flex items-center justify-between p-1">
      <img v-lazy="data.avatar" class="mr-1 inline-block h-6 w-6 cursor-pointer rounded-full" />

      <div class="flex-1 text-xs text-zinc-800 dark:text-zinc-100">
        {{ data.author }}
      </div>

      <fn-popover trigger="click" placement="bottom-end" width="140px">
        <template #reference>
          <div
            class="flex cursor-pointer items-center justify-center rounded-full p-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700/60"
          >
            <fn-svg-icon name="more" :size="16" class="fill-zinc-800 dark:fill-zinc-200" />
          </div>
        </template>

        <ul>
          <li
            class="cursor-pointer rounded-md px-2 py-2 text-sm text-gray-500 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-700/60"
          >
            屏蔽采集
          </li>
          <li
            class="cursor-pointer rounded-md px-2 py-2 text-sm text-gray-500 hover:bg-gray-100 dark:text-zinc-400 dark:hover:bg-zinc-700/60"
          >
            举报采集
          </li>
        </ul>
      </fn-popover>
    </div>
  </div>
</template>
