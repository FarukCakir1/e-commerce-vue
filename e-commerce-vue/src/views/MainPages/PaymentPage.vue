<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { useBasketStore } from '@/stores/basket'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import CustomInput from '@/components/Form/CustomInput.Vue'

const authStore = useAuthStore()
const basketStore = useBasketStore()
const addressVal = ref<string>('Kayıtlı Adreslerim')
const cardVal = ref<string>('Kayıtlı Kartlarım')
const { addresses } = storeToRefs(authStore)
const { cards } = storeToRefs(authStore)
const addAddressModalVisibility = ref<boolean>(false)
const addCardModalVisibility = ref<boolean>(false)

const newAddress = reactive({
  title: '',
  address: ''
})

const newCard = reactive({
  cardName: '',
  cardNumber: '',
  cardOwner: '',
  cardCVV: '',
  cardExpireDate: ''
})

const handleAddAddress = async () => {
  await authStore.addNewAddress(newAddress)
  addAddressModalVisibility.value = false
}

const handleAddNewCard = async () => {
  await authStore.addNewCard(newCard)
  addCardModalVisibility.value = false
}
</script>

<template>
  <div class="w-full h-full flex justify-center items-start mt-10">
    <a-modal
      v-model:open="addAddressModalVisibility"
      title="Basic Modal"
      okType="secondary"
      @ok="handleAddAddress"
    >
      <CustomInput v-model="newAddress.title" label="Adres Başlığı" placeholder="Adres Başlığı" />
      <CustomInput class="mt-5" v-model="newAddress.address" label="Adres" placeholder="Adres" />
    </a-modal>
    <a-modal
      v-model:open="addCardModalVisibility"
      title="Basic Modal"
      okType="secondary"
      @ok="handleAddNewCard"
    >
      <div class="w-full px-8">
        <div
          class="card bg-white w-full h-[200px] shadow-lg mb-10 rounded-xl flex flex-col justify-start p-5"
        >
          <span class="text-xl font-semibold">{{ newCard.cardName }}</span>
          <span class="mt-7 text-xl font-semibold">{{ newCard.cardNumber }}</span>
          <div class="w-full flex justify-between mt-auto">
            <div class="flex flex-col gap-2">
              <span class="text-xs font-bold">Kart Sahibi:</span>
              <span class="text-md font-light text-gray-500">{{ newCard.cardOwner }}</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-xs font-bold">Son Kullanım Tarihi:</span>
              <span class="text-md font-light text-gray-500">{{ newCard.cardExpireDate }}</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-xs font-bold">CVV:</span>
              <span class="text-md font-light text-gray-500">{{ newCard.cardCVV }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <CustomInput v-model="newCard.cardName" label="Kart Adı" placeholder="Kart Adı" />
        <CustomInput
          v-model="newCard.cardNumber"
          label="Kart Numarası"
          placeholder="Kart Numarası"
        />
        <CustomInput v-model="newCard.cardOwner" label="Kart Sahibi" placeholder="Kart Sahibi" />
        <CustomInput
          v-model="newCard.cardExpireDate"
          label="Son Kullanım Tarihi"
          placeholder="Son Kullanım Tarihi"
        />
        <CustomInput v-model="newCard.cardCVV" label="CVV" placeholder="Kart Sahibi" />
      </div>
    </a-modal>
    <div class="container px-10 mx-auto flex flex-col gap-5">
      <div class="address flex flex-col gap-6 border border-gray-100 shadow-xl p-5">
        <span>Kayıtlı Adreslerim</span>
        <a-dropdown :trigger="['click']">
          <a
            class="flex items-center gap-2 border border-blue-400 rounded-md w-max p-2"
            @click.prevent
          >
            <span class="shrink-0">{{ addressVal }}</span>
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="(address, i) in addresses"
                :key="i"
                @click="addressVal = address.title"
              >
                <span>{{ address.title }}</span>
                <span class="text-gray-500 text-sm">
                  {{ address.address }}
                </span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" @click="addAddressModalVisibility = true">
                <span class="text-blue-400 cursor-pointer">Yeni Adres Ekle</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="flex flex-col gap-6 border border-gray-100 shadow-xl p-5">
        <span>Kayıtlı Kartlarım</span>
        <a-dropdown :trigger="['click']">
          <a
            class="flex items-center gap-2 border border-blue-400 rounded-md w-max p-2"
            @click.prevent
          >
            <span class="shrink-0">{{ cardVal }}</span>
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item v-for="(card, i) in cards" :key="i" @click="cardVal = card.cardName">
                <span>{{ card.cardName }}</span>
                <span class="text-gray-500 text-sm">
                  {{ card.cardNumber }}
                </span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" @click="addCardModalVisibility = true">
                <span class="text-blue-400 cursor-pointer">Yeni Kart Ekle</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="shadow-xl p-5 flex justify-between items-center">
        <span class="text-md">Toplam Tutar: {{ basketStore.getTotalPrice }}₺</span>
        <a-button class="bg-blue-300 text-white mxlauto" type="round" size="large">
          Alışverişi tamamla
        </a-button>
      </div>
    </div>
  </div>
</template>

<style>
.ant-dropdown-menu-title-content {
  @apply flex flex-col gap-1 justify-start;
}
</style>
