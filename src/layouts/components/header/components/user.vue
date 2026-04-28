<script setup>
const menuData = [
  {
    id: 'profile',
    label: '个人设置',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 'vip',
    label: '会员中心',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 'logout',
    label: '退出登录',
    icon: 'logout',
    path: ''
  }
]
</script>

<template>
  <fn-button v-if="true" type="primary" round class="ml-3 h-11"> 登录/注册 </fn-button>

  <fn-popover v-else placement="bottom-end" width="150px">
    <template #reference>
      <div class="ml-3 flex h-11 cursor-pointer items-center">
        <div class="relative">
          <img class="h-8 w-8 rounded-full" src="https://img1.ttxsapp.com/avatar/default/3.png" />

          <fn-svg-icon name="vip" class="absolute -right-1 -bottom-1 h-4 w-4" />
        </div>

        <fn-svg-icon name="down-arrow" class="ml-1 h-3 w-3 fill-zinc-900 dark:fill-zinc-300" />
      </div>
    </template>

    <ul class="flex flex-col">
      <li
        class="flex cursor-pointer items-center rounded-lg px-4 py-2 hover:bg-zinc-100/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
        v-for="item in menuData"
        :key="item.id"
      >
        <fn-svg-icon :name="item.icon" size="16" class="mr-2 fill-zinc-900 dark:fill-zinc-300" />

        <span class="text-sm">{{ item.label }}</span>
      </li>
    </ul>
  </fn-popover>
</template>

<style scoped></style>
