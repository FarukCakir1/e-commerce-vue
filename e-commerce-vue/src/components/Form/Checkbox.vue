<script setup lang="ts">
defineProps<{
  checked: boolean
}>()

const emit = defineEmits(['update:checked'])
</script>

<template>
  <div>
    <a-checkbox
      :checked="checked"
      @change="emit('update:checked', $event.target.checked)"
      class="flex items-start"
    >
      <slot />
    </a-checkbox>
  </div>
</template>
<style scoped></style>
