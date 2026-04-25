<script setup>
import HeaderVue from '@/layouts/components/header/index.vue'
import Toolkit from '@/layouts/components/toolkit/index.vue'
</script>

<template>
  <!-- pc 模式 -->
  <header-vue class="h-header" />

  <main class="h-main overflow-y-auto">
    <slot />
  </main>

  <toolkit class="fixed right-2 bottom-4" />
</template>

<style scoped></style>
