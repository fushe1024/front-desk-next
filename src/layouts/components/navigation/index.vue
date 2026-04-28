<script setup>
import PcComp from './comp/pc.vue'
import MobileComp from './comp/mobile.vue'
import { isMobileTerminal } from '@/utils/device'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/store'

const categoryStore = useCategoryStore()

const { categoryList } = storeToRefs(categoryStore)
const { getCategoryList } = categoryStore

// 获取导航组件
const Nav = computed(() => (isMobileTerminal.value ? MobileComp : PcComp))

// 处理分类点击事件
const handleCategoryClick = (index) => {
  console.log(index)
}

getCategoryList()
</script>

<template>
  <component :is="Nav" :data="categoryList" @child-click="handleCategoryClick" />
</template>

<style scoped></style>
