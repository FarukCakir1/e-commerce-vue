<script setup lang="ts"></script>

<template>
  <div class="w-screen h-screen relative">
    <div
      class="w-full h-[400px] absolute bg-blue-100 top-0 z-[-10] flex flex-col gap-5 pt-14 justify-start items-center"
    >
      <h1 class="text-2xl">E-Commerce-app-vue</h1>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
