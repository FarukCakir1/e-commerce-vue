<script setup lang="ts">
import MainHeader from '@/components/Header/MainHeader.vue'
</script>

<template>
  <MainHeader />
  <div class="flex flex-col gap-5 py-10">
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
