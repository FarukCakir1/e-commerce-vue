<script setup lang="ts">
import RegisterCard from '@/components/Auth/RegisterCard.vue'
import { useAuthStore } from '@/stores/auth'
import { reactive } from 'vue'

const store = useAuthStore()
const loginState = reactive<{
  name: string
  surname: string
  username: string
  birthDate: string | Date
  password: string
}>({
  name: '',
  surname: '',
  username: '',
  birthDate: '',
  password: ''
})

const handleRegister = async () => {
  await store.register(loginState)
}
</script>
<template>
  <div class="w-full h-full flex items-center justify-center">
    <RegisterCard
      v-model:name="loginState.name"
      v-model:surname="loginState.surname"
      v-model:password="loginState.password"
      v-model:username="loginState.username"
      v-model:birth-date="loginState.birthDate"
      @submit="handleRegister"
    />
  </div>
</template>

<style scoped></style>
