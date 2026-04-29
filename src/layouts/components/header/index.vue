<script setup>
import Logo from './components/logo.vue'
import Search from './components/search.vue'
import Theme from './components/theme.vue'
import User from './components/user.vue'
</script>

<template>
  <header
    class="sticky top-0 left-0 flex items-center justify-between bg-white px-6 transition-colors dark:border-b dark:border-zinc-700 dark:bg-zinc-800"
  >
    <logo />
    <search />
    <theme />
    <user />
  </header>
</template>

<style scoped></style>
