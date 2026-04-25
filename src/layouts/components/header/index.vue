<script setup>
import Logo from './components/logo.vue'
import Search from './components/search.vue'
import Theme from './components/theme.vue'
import User from './components/user.vue'
</script>

<template>
  <header class="sticky top-0 left-0 flex w-full items-center justify-between bg-white px-6">
    <logo />
    <search />
    <theme />
    <user />
  </header>
</template>

<style scoped></style>
