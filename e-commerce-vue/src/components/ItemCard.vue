<script setup lang="ts">
import type { IProductCardItem } from '@/types/components/ProductCard'
import { useBasketStore } from '@/stores/basket'

const store = useBasketStore()
defineProps<{
  item: Partial<IProductCardItem>
}>()
</script>

<template>
  <div
    class="product-card shadow-sm border border-gray-50 flex flex-col p-3 bg-white overflow-hidden"
  >
    <div class="border-gray-100 rounded-sm overflow-hidden h-3/4 max-w-full">
      <img class="w-full h-full" :src="item.image" alt="" />
    </div>
    <div class="w-full p-2 h-1/2 flex flex-col justify-between">
      <div class="flex flex-col gap-2 items-start">
        <span class="text-md font-semibold">{{ item.title }}</span>
        <a-rate :value="item.rate" disabled style="font-size: 15px" allow-half />
      </div>
      <h4 class="text-xl font-semibold">{{ item.price }}₺</h4>
      <a-button
        size="large"
        type="round"
        class="bg-blue-400 text-white"
        @click="store.addItemToBasket(item)"
        >Sepete Ekle</a-button
      >
    </div>
  </div>
</template>

<style scoped></style>
