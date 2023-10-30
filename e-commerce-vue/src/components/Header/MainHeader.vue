<script setup lang="ts">
import AutoComplete from '../AutoComplete.vue'
import HeaderCategories from './HeaderCategories.vue'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { useBasketStore } from '@/stores/basket'

const store = useAuthStore()
const basketStore = useBasketStore()
const headerSearchOptions = () => {
  return [
    {
      value: 'Mobilya',
      id: '1'
    },
    {
      value: 'Elektronik',
      id: '2'
    }
  ]
}

const handleLogout = () => {
  store.logout()
}
</script>

<template>
  <header class="w-full h-auto">
    <div class="container mx-auto px-10 h-20 flex gap-10 items-center">
      <h1 class="text-xl text-blue-600 flex-shrink-0">E-commerce-app</h1>
      <div class="px-10 flex w-full">
        <AutoComplete :options="headerSearchOptions" />
      </div>
      <RouterLink
        :to="{ name: 'basket' }"
        class="flex gap-2 items-center justify-center h-full relative"
      >
        <div
          v-if="basketStore.getBasketCount > 0"
          class="absolute w-5 h-5 border border-black rounded-full bg-blue-400 text-white flex items-center justify-center text-xs -left-1 top-4"
        >
          {{ basketStore.getBasketCount }}
        </div>
        <ShoppingCartOutlined style="font-size: 30px" />
        <span>Sepetim</span>
      </RouterLink>
      <div class="flex gap-2 flex-shrink-0 items-center">
        <UserOutlined style="font-size: 30px" />
        <div v-if="!store.hasSession" class="flex gap-px flex-col">
          <span class="text-xs text-gray-500 mb-[-5px]">Hesabım</span>
          <div class="flex gap-2 items-center">
            <RouterLink
              :to="{ name: 'register' }"
              class="text-sm underline hover:no-underline font-semibold cursor-pointer"
              >Üye ol</RouterLink
            >
            <div class="w-1 h-1 rounded-full bg-blue-500" />
            <RouterLink
              :to="{ name: 'login' }"
              class="text-sm underline hover:no-underline font-semibold cursor-pointer"
              >Giriş Yap</RouterLink
            >
          </div>
        </div>
        <a-dropdown v-else>
          <span class="text-xs text-gray-500 mb-[-5px] cursor-pointer">Hesabım</span>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">Hesabım</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" v-if="store.getSession.role === 'ADMIN'">Admin Panel</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" class="text-red-400" @click="handleLogout">Çıkış Yap</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <HeaderCategories />
  </header>
</template>

<style scoped></style>
