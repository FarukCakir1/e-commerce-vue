<script setup lang="ts">
import { computed, defineAsyncComponent, reactive } from 'vue'
import CustomInput from '../Form/CustomInput.Vue'
import DatePicker from '../Form/DatePicker.vue'
import dayjs from 'dayjs'
import Checkbox from '../Form/Checkbox.vue'
defineProps<{
  name: string
  surname: string
  username: string
  password: string
  birthDate: any
}>()
const emit = defineEmits([
  'update:name',
  'update:surname',
  'update:password',
  'update:username',
  'update:birthDate',
  'submit'
])
const userIcon = defineAsyncComponent({
  loader: () => import('@ant-design/icons-vue/UserOutlined')
})
const lockIcon = defineAsyncComponent({
  loader: () => import('@ant-design/icons-vue/LockFilled')
})
const conditions = reactive({
  terms: false,
  terms2: false
})
const changeEvent = (e: any) => {
  const formatDate = dayjs(e, 'DD/MM/YYYY')
  emit('update:birthDate', formatDate)
  console.log(formatDate)
}
const canSubmit = computed(() => {
  return conditions.terms && conditions.terms2
})
</script>

<template>
  <div class="w-1/2 h-auto p-7 flex flex-col gap-3 border border-gray-100 shadow-xl bg-white">
    <div class="flex gap-1 items-center justify-between">
      <CustomInput
        class="basis-1/2"
        :icon="userIcon"
        :value="name"
        @input="emit('update:name', $event.target.value)"
        placeholder="İsim"
        label="İsim"
      />
      <CustomInput
        class="basis-1/2"
        :icon="userIcon"
        :value="surname"
        @input="emit('update:surname', $event.target.value)"
        placeholder="Soyisim"
        label="Soyisim"
      />
    </div>
    <CustomInput
      :icon="userIcon"
      :value="username"
      @input="emit('update:username', $event.target.value)"
      placeholder="Kullanıcı Adı"
      label="Kullanıcı Adı"
    />
    <CustomInput
      :icon="lockIcon"
      :value="password"
      @input="emit('update:password', $event.target.value)"
      placeholder="Şifre"
      label="Şifre"
      :is-password="true"
    />
    <DatePicker :value="birthDate" @update:value="changeEvent" label="Doğum Tarihi" />
    <div class="mt-10">
      <Checkbox v-model:checked="conditions.terms">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, itaque!
      </Checkbox>
      <Checkbox v-model:checked="conditions.terms2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, itaque!
      </Checkbox>
    </div>
    <a-button
      shape="round"
      type="primary"
      class="bg-blue-400 h-[40px] text-white !hover:text-white mt-10"
      :disabled="!canSubmit"
      @click="emit('submit')"
      >Kayıt Ol
    </a-button>
  </div>
</template>
<style scoped></style>
