<script setup lang="ts">
import { useBasketStore } from '@/stores/basket'
import { DeleteFilled } from '@ant-design/icons-vue'
import { onUnmounted } from 'vue'
import type { IProductBasket } from '@/types/components/ProductBasket'
import { storeToRefs } from 'pinia'

const store = useBasketStore()
const { getBasket } = storeToRefs(store)
const handleDelete = (payload: IProductBasket) => {
  store.deleteItemToBasket(payload)
}

onUnmounted(() => {
  store.refreshBasket()
})
</script>

<template>
  <div class="container flex items-center px-10 mx-auto">
    <div class="border border-gray-100 flex flex-col gap-3 w-full px-5 pt-5 items-center">
      <div v-if="store.getBasketCount > 0" class="item-list flex flex-col gap-5 w-full">
        <ul>
          <li
            v-for="(product, i) in getBasket"
            :key="i"
            class="flex w-full h-[100px] border border-gray-100 mb-5"
          >
            <div class="img-wrapper w-1/9 h-full border-r border-r-gray-100">
              <img :src="product.image" alt="" class="w-full max-h-full object-fill" />
            </div>
            <div class="flex w-full justify-between">
              <div class="flex flex-col justify-center pl-10 items-start px-5 gap-2">
                <span class="text-lg font-semibold">
                  {{ product.title }}
                </span>
                <span> {{ product.price }}₺ </span>
              </div>
              <div class="flex h-full items-center gap-3 pr-12">
                <a-input-number
                  v-model:value="product.amount"
                  size="large"
                  :min="1"
                  :max="100000"
                />
                <a-popconfirm
                  title="Bu ürün kalıcı olarak silinecek onaylıyor musunuz?"
                  okText="Onayla"
                  cancelText="Vazgeç"
                  @confirm="handleDelete(product)"
                  okType="secondary"
                >
                  <DeleteFilled style="font-size: 20px; color: red; cursor: pointer" />
                </a-popconfirm>
              </div>
            </div>
          </li>
        </ul>
        <div class="flex justify-between w-full mt-auto border-t border-t-gray-100 py-5">
          <span class="text-xl">{{ store.getTotalPrice }}</span>
          <a-button class="bg-blue-300 text-white mxlauto" type="round" size="large">
            Ödemeye geç
          </a-button>
        </div>
      </div>
      <div v-else class="w-full flex flex-col gap-14">
        <h3 class="text-center text-2xl">
          Henüz sepetinde hiç bir ürün yok. Hemen en uygun fiyatlarla alışverişe başla
        </h3>
        <a-button
          @click="$router.push({ name: 'home' })"
          class="bg-blue-300 text-white ml-auto mb-2"
          type="round"
          size="large"
          >Alışverişe başla</a-button
        >
      </div>
    </div>
  </div>
</template>
<style scoped></style>
