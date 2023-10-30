<script setup lang="ts">
import CustomInput from '@/components/Form/CustomInput.Vue'
import { useFetch } from '@/composables/useFetch'
import type { IPayloadOptions } from '@/types/PayloadOptions'
import type { IProductCardItem } from '@/types/components/ProductCard'
import { apiService } from '@/utils/apiService'
import { DeleteFilled, EditFilled } from '@ant-design/icons-vue'
import { ref } from 'vue'
import draggable from 'vuedraggable'

const currentPage = ref<number>(1)
const payload = ref<IPayloadOptions>({
  order: 'asc',
  sort: 'order',
  page: 1,
  limit: 10
})
const { data: products, refresh } = useFetch<IProductCardItem>('products', payload.value)
const editModalVisibility = ref<boolean>(false)
const editingItem = ref<any>()

const handleOk = async () => {
  await apiService.put(`/products/${editingItem.value.id}`, {
    ...editingItem.value
  })
  editModalVisibility.value = false
}
const handleDelete = async (item: IProductCardItem) => {
  await apiService.delete(`/products/${item.id}`)
  await refresh(payload.value)
}
const handleEditModal = (item: IProductCardItem) => {
  editingItem.value = item
  editModalVisibility.value = true
}

const afterDrag = async () => {
  products.value?.map(async (item, i) => {
    await apiService.put(`/products/${item.id}`, {
      ...item,
      order: i
    })
  })
}

const handleSort = (order: 'asc' | 'desc') => {
  payload.value.order = order
  refresh(payload.value)
}

const handleClearFilter = () => {
  payload.value = {
    order: 'asc',
    sort: 'order',
    limit: 10,
    page: currentPage.value
  }
}
</script>
<template>
  <div class="w-full h-auto flex flex-col gap-10 pb-10">
    <div>
      <a-modal
        v-model:open="editModalVisibility"
        title="Basic Modal"
        @ok="handleOk"
        okType="secondary"
      >
        <div class="flex flex-col gap-1">
          <div class="img-wrapper w-[300px] h-[300px] mx-auto">
            <img :src="editingItem?.image" alt="" class="max-w-full h-full object-cover" />
          </div>
          <div class="flex flex-col gap-2">
            <CustomInput
              v-model="editingItem.title"
              placeholder="Ürün Başlığı"
              label="Ürün Başlığı"
            />
            <CustomInput
              v-model="editingItem.price"
              placeholder="Ürün Fiyatı"
              label="Ürün Fiyatı"
            />
          </div>
        </div>
      </a-modal>
    </div>
    <div class="flex justify-between">
      <h2 class="text-2xl">Ürünler</h2>
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <a-button class="bg-blue-300 text-white" type="round">Fiyata Göre Sırala</a-button>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0" @click="handleSort('desc')">
              <span>Çoktan Aza</span>
            </a-menu-item>
            <a-menu-item key="1" @click="handleSort('asc')">
              <span>Azdan Çoka</span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3" @click="handleClearFilter">Sıfırla</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div class="w-full h-auto flex flex-col gap-5">
      <draggable v-model="products" tag="ul" itemKey="1" @end="afterDrag">
        <template #item="{ element: product }">
          <li class="flex w-full h-[100px] border border-gray-100 mb-5">
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
                <EditFilled
                  @click="handleEditModal(product)"
                  style="font-size: 20px; cursor: pointer"
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
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped></style>
