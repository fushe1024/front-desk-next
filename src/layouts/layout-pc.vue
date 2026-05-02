<script setup>
import HeaderVue from '@/layouts/components/header/index.vue'
import Toolkit from '@/layouts/components/toolkit/index.vue'
</script>

<template>
  <!-- pc 模式 -->
  <header-vue class="h-header z-50" />

  <main class="h-main z-0 overflow-y-auto bg-white transition-colors duration-500 dark:bg-zinc-800">
    <slot />
  </main>

  <toolkit class="fixed right-2 bottom-10 bg-amber-300" />
</template>

<style scoped></style>
