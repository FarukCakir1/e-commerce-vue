<script setup lang="ts">
import Slider from '@/components/Slider.vue'
import type { IProductCardItem } from '@/types/components/ProductCard'
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch'
import ItemCard from '@/components/ItemCard.vue'
import type { IPayloadOptions } from '@/types/PayloadOptions'

const currentPage = ref<number>(1)
const payload = ref<IPayloadOptions>({
  sort: 'order',
  order: 'asc',
  page: 1,
  limit: 8
})
const { data: products, refresh } = useFetch<IProductCardItem>('products', payload.value)

const pageChange = (page: number) => {
  payload.value.page = page
  refresh(payload.value)
}
</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="best-sellers bg-blue-100">
      <div class="flex flex-col container p-10 mx-auto gap-5">
        <h2 class="text-2xl font-semibold">Çok Satanlar</h2>
        <Slider :items-per-page="4" />
      </div>
    </div>
    <div class="flex flex-col container px-10 mx-auto gap-5">
      <h2 class="text-2xl font-semibold">Ürünler</h2>
      <div class="products gap-5 grid grid-cols-4">
        <ItemCard v-for="(item, i) in products" :key="i" :item="item" />
      </div>
      <a-pagination
        v-model:current="currentPage"
        :total="10"
        :pageSize="8"
        class="ml-auto flex my-5"
        @change="pageChange"
      />
    </div>
  </div>
</template>
<style scoped></style>
