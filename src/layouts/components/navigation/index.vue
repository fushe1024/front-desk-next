<script setup>
import PcComp from './comp/pc.vue'
import MobileComp from './comp/mobile.vue'
import { isMobileTerminal } from '@/utils/device'
import { computed, ref } from 'vue'
import { getCategory } from '@/api/category'
import { CATEGORY_All } from '@/constants'

// 获取导航组件
const Nav = computed(() => (isMobileTerminal.value ? MobileComp : PcComp))

// 获取分类列表
const categoryList = ref([])
const getCategoryList = async () => {
  const res = await getCategory()
  categoryList.value = [CATEGORY_All, ...res.categorys]
}

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
