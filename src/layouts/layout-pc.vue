<script setup>
import HeaderPC from '@/layouts/components/header/index.vue'
import Totop from '@/layouts/components/totop/index.vue'
</script>

<template>
  <!-- pc 模式 -->
  <HeaderPC />
  <slot></slot>
  <Totop />
</template>

<style scoped></style>
