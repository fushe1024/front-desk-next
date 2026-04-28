import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategory } from '@/api/category'
import { CATEGORY_All } from '@/constants'

export const useCategoryStore = defineStore(
  'category',
  () => {
    // 获取分类列表
    const categoryList = ref([])

    // 获取分类列表
    const getCategoryList = async () => {
      const res = await getCategory()
      categoryList.value = [CATEGORY_All, ...res.categorys]
    }

    return { categoryList, getCategoryList }
  },
  {
    persist: true
  }
)
