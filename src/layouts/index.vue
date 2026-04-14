<script setup>
import { computed } from 'vue'
import { isMobileTerminal } from '@/utils/device'
import MobileComp from './components/Mobile-Layout.vue'
import PcComp from './components/PC-Layout.vue'

// 获取布局组件
const Layout = computed(() => (isMobileTerminal.value ? MobileComp : PcComp))
</script>

<template>
  <component :is="Layout"></component>
</template>

<style scoped></style>
