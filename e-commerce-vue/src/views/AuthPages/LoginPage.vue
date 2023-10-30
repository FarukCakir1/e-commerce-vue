<script setup lang="ts">
import LoginCard from '@/components/Auth/LoginCard.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()

const username = ref<string>('')
const password = ref<string>('')

const handleLogin = () => {
  store.login(username.value, password.value)
}
</script>
<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <LoginCard v-model:username="username" v-model:password="password" @submit="handleLogin" />
  </div>
</template>

<style scoped></style>
