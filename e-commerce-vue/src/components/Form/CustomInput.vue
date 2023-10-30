<script setup lang="ts">
defineProps<{
  modelValue?: string
  icon?: any
  placeholder: string
  label?: string
  isPassword?: boolean
}>()
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-wrapper w-auto flex flex-col gap-3">
    <span v-if="label" class="text-xs text-gray-400">{{ label }}</span>
    <a-input
      v-if="!isPassword"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
      :size="'large'"
    >
      <template #prefix>
        <component :is="icon"></component>
      </template>
      <!-- <template #suffix>
        <a-tooltip title="Extra information"> // </a-tooltip>
      </template> -->
    </a-input>
    <a-input-password
      v-else
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
      :size="'large'"
    >
      <template #prefix>
        <component :is="icon"></component>
      </template>
      <!-- <template #suffix>
        <a-tooltip title="Extra information"> // </a-tooltip>
      </template> -->
    </a-input-password>
  </div>
</template>

<style></style>
