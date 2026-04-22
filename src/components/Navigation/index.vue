<script setup>
import PcComp from './comp/pc.vue'
import MobileComp from './comp/mobile.vue'
import { isMobileTerminal } from '@/utils/device'
import { computed, ref, onMounted } from 'vue'
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

onMounted(() => {
  getCategoryList()
})
</script>

<template>
  <component :is="Nav" :data="categoryList" />
</template>

<style scoped></style>
