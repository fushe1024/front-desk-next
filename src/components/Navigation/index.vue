<script setup>
import PcComp from './comp/pc.vue'
import MobileComp from './comp/mobile.vue'
import { isMobileTerminal } from '@/utils/device'
import { computed, ref } from 'vue'
import { getCategory } from '@/api/category'

// 获取导航组件
const Nav = computed(() => (isMobileTerminal.value ? MobileComp : PcComp))

// 获取分类列表
const categoryList = ref([])
const getCategoryList = async () => {
  const res = await getCategory()
  categoryList.value = res
  console.log(res)
}
getCategoryList()
</script>

<template>
  <component :is="Nav" />
</template>

<style scoped></style>
