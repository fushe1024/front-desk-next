<script setup>
import { computed, useSlots, ref } from 'vue'
import SvgIcon from '../svg-icon'
import Button from '../button'

const slots = useSlots()

defineOptions({
  name: 'Search'
})

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  },
  prefixFixed: {
    type: Boolean,
    default: false
  },
  showButton: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['search', 'clear', 'blur', 'focus', 'input'])

// 输入框值
const inputValue = defineModel({
  type: String,
  default: ''
})

// 是否固定前缀图标 - 当输入框有内容时，前缀图标是否固定显示
const isPrefixFixed = computed(() => props.prefixFixed || inputValue.value.length === 0)

// 是否显示清空按钮 - 当输入框有内容且 clearable 为 true 时显示
const isShowClearButton = computed(() => props.clearable && inputValue.value.length > 0)

// 清空输入框
const onClear = () => {
  inputValue.value = ''
  emit('clear')
}

// 输入框失去焦点
const onBlur = (e) => {
  isFocus.value = false
  emit('blur', e)
}

// 输入框获取焦点
const isFocus = ref(false)
const onFocus = (e) => {
  isFocus.value = true
  emit('focus', e)
}

// 输入框输入事件
const onInput = (e) => {
  emit('input', e.target.value)
}

// 搜索按钮点击事件
const onSearch = (e) => {
  emit('search', e)
}

// 监听输入框的回车事件
const onKeydown = (e) => {
  if (e.key === 'Enter') {
    onSearch(e)
  }
}
</script>

<template>
  <div class="group relative w-full rounded-xl bg-gray-100 p-1 dark:bg-zinc-600">
    <!-- search -->
    <div
      class="flex h-10 items-center rounded-xl pl-4 duration-300 focus-within:bg-white hover:bg-white dark:focus-within:bg-zinc-700 dark:hover:bg-zinc-700"
    >
      <svg-icon v-show="isPrefixFixed" name="search" size="20" class="mr-4" />

      <input
        v-model="inputValue"
        type="text"
        :placeholder="placeholder"
        class="w-full bg-transparent font-normal tracking-wide text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @keydown="onKeydown"
      />

      <div
        v-show="isShowClearButton"
        class="mr-4 flex cursor-pointer items-center justify-center rounded-xl bg-zinc-950 p-0.5 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        @click="onClear"
      >
        <svg-icon name="close" size="14" class="fill-zinc-100 dark:fill-zinc-200" />
      </div>

      <Button type="main" class="rounded-xl" active-anime @click="onSearch">
        <svg-icon name="search" size="16" class="fill-white" />
      </Button>
    </div>

    <!-- result -->
    <transition name="slide-fade">
      <div
        v-if="slots.dropdown"
        v-show="isFocus"
        class="absolute top-full left-0 mt-3 w-full rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
