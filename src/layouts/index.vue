<script setup>
import { computed } from 'vue'
import { isMobileTerminal } from '@/utils/device'
import MobileComp from './layout-mobile.vue'
import PcComp from './layout-pc.vue'
import Navigation from '@/layouts/components/navigation/index.vue'
import List from '@/layouts/components/list/index.vue'

// 获取布局组件
const Layout = computed(() => (isMobileTerminal.value ? MobileComp : PcComp))
</script>

<template>
  <component :is="Layout">
    <Navigation />
    <List />
  </component>
</template>

<style scoped></style>
