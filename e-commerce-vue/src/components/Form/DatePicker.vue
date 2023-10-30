<script setup lang="ts">
defineProps<{
  value: any
  label?: string
}>()
const emit = defineEmits(['update:value'])
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <span v-if="label" class="text-xs text-gray-400">{{ label }}</span>
    <a-date-picker
      :value="value"
      format="DD/MM/YYYY"
      @change="emit('update:value', $event)"
      size="large"
      style="width: 100%"
    />
  </div>
</template>

<style scoped></style>
