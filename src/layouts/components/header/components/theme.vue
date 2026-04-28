<script setup>
import { ThemeMode } from '@/enums'

// 主题模式数据
const themeModeData = [
  {
    label: '极简白',
    value: ThemeMode.LIGHT,
    icon: 'theme-light'
  },
  {
    label: '极夜黑',
    value: ThemeMode.DARK,
    icon: 'theme-dark'
  },
  {
    label: '跟随系统',
    value: ThemeMode.SYSTEM,
    icon: 'theme-system'
  }
]

// 切换主题模式
const handleThemeModeClick = (value) => {
  // 设置暗黑/明亮模式
  const html = document.documentElement
  if (value) {
    html.classList.add('dark')
    html.classList.remove('light')
  } else {
    html.classList.add('light')
    html.classList.remove('dark')
  }
}
</script>

<template>
  <fn-popover placement="bottom-end" width="170px">
    <template #reference>
      <div
        class="flex cursor-pointer items-center justify-center rounded-lg p-3 duration-200 hover:bg-gray-100 dark:hover:bg-zinc-900"
      >
        <fn-svg-icon name="theme-light" size="20" class="fill-zinc-900 dark:fill-zinc-300" />
      </div>
    </template>

    <ul class="flex flex-col">
      <li
        class="flex cursor-pointer items-center rounded-lg px-4 py-2 hover:bg-zinc-100/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
        v-for="item in themeModeData"
        :key="item.value"
        @click="handleThemeModeClick(item.value)"
      >
        <fn-svg-icon :name="item.icon" size="16" class="mr-2 fill-zinc-900 dark:fill-zinc-300" />

        <span class="text-sm">{{ item.label }}</span>
      </li>
    </ul>
  </fn-popover>
</template>

<style scoped></style>
