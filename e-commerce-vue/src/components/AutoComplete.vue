<script setup lang="ts">
import type { IAutoComplete } from '@/types/components/AutoComplete'
import type { IAutoCompleteOption } from '@/types/components/AutoComplete'
import { ref } from 'vue'
withDefaults(defineProps<IAutoComplete>(), {
  options: () => []
})
const value = ref<string>('')
defineEmits(['update:value'])
const filterOption = (input: string, option: IAutoCompleteOption) => {
  return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0
}
</script>

<template>
  <div class="w-full h-14">
    <a-auto-complete
      v-model:value="value"
      :options="options()"
      style="width: 100%"
      placeholder="input here"
      :filter-option="filterOption"
    />
  </div>
</template>

<style lang="scss">
.ant-select {
  @apply h-full;
  .ant-select-selector {
    @apply h-full flex items-center rounded-2xl #{!important};
    input {
      @apply h-full text-lg  border-red-500 #{!important};
    }
  }

  .ant-select-selection-placeholder {
    @apply text-lg #{!important};
  }
}
</style>
