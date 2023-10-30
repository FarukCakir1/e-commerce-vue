<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import TokenService from './utils/tokenService'
const store = useAuthStore()
onMounted(() => {
  const id = TokenService.getToken()
  console.log(id)

  if (id !== null) store.loginWithToken(id)
})
</script>

<template>
  <RouterView />
</template>
