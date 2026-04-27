<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const search = () => {
  console.log('搜索：', inputValue.value)
}
</script>

<template>
  <div class="mr-4 ml-8 flex-1">
    <fn-search
      v-model="inputValue"
      clearable
      placeholder="大家都在搜：JavaScript、Vue3、Vite3..."
      @search="search"
    >
      <template #dropdown>
        <div class="text-sm text-zinc-500">暂无搜索结果</div>
      </template>
    </fn-search>
  </div>
</template>

<style scoped></style>
