<script setup lang="ts">
defineProps<{
  username: string
  password: string
}>()
const emit = defineEmits(['update:username', 'update:password', 'submit'])
</script>

<template>
  <div class="w-1/2 h-auto p-7 flex flex-col gap-3 border border-gray-100 shadow-xl bg-white">
    <CustomInput
      class="basis-1/2"
      :value="username"
      @input="emit('update:username', $event.target.value)"
      placeholder="Kullanıcı Adı"
      label="Kullanıcı Adı"
    />
    <CustomInput
      class="basis-1/2"
      :value="username"
      @input="emit('update:password', $event.target.value)"
      placeholder="Şifre"
      label="Şifre"
      is-password="true"
    />
    <a-button
      shape="round"
      type="primary"
      class="bg-blue-400 h-[40px] text-white !hover:text-white mt-10"
      @click="emit('submit')"
      >Giriş Yap
    </a-button>
  </div>
</template>
<style scoped></style>
