<script setup lang="ts">
import { CopyOutlined, ShopFilled, UserAddOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <div class="w-screen h-screen flex">
    <a-menu class="shrink-0 py-10" id="dddddd" style="width: 256px; height: 100%" mode="inline">
      <a-menu-item>
        <RouterLink :to="{ name: 'home' }" class="flex gap-2 items-center">
          <ShopFilled style="font-size: 20px" />
          <span class="text-lg">Ürün Yönetimi</span>
        </RouterLink>
      </a-menu-item>
      <a-menu-item>
        <RouterLink :to="{ name: 'home' }" class="flex gap-2 items-center">
          <UserAddOutlined style="font-size: 20px" />
          <span class="text-lg">Kategori Yönetimi</span>
        </RouterLink>
      </a-menu-item>
      <a-menu-item>
        <RouterLink :to="{ name: 'home' }" class="flex gap-2 items-center">
          <CopyOutlined style="font-size: 20px" />
          <span class="text-lg">Kullanıcı Yönetimi</span>
        </RouterLink>
      </a-menu-item>
    </a-menu>
    <div class="w-full p-10">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
