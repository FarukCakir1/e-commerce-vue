<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import type { IPayloadOptions } from '@/types/PayloadOptions'
import type { ISliderProps } from '@/types/components/Slider'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'

//props
const props = withDefaults(defineProps<Partial<ISliderProps>>(), {
  itemsPerPage: 4,
  gap: 20,
  items: () => []
})
//constants
const payload = ref<IPayloadOptions>({ order: 'asc', sort: 'order', page: 1, limit: 8 })
const { data: sliderItems } = useFetch('/products', payload.value)
const sliderWrapper = ref<HTMLDivElement>()
//functions
const slide = (direction: 'left' | 'right') => {
  const slideValue = sliderWrapper.value?.clientWidth || 0
  sliderWrapper.value?.scrollBy({
    top: 0,
    left: direction === 'right' ? slideValue : slideValue * -1,
    behavior: 'smooth'
  })
}
//computeds&Watchers
const itemsWidth = computed(() => {
  if (!sliderWrapper.value) return null
  return sliderWrapper.value?.clientWidth / props.itemsPerPage - props.gap
})
</script>

<template>
  <div class="w-full relative">
    <div
      @click="slide('left')"
      class="left w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center absolute top-[calc(50%-20px)] left-[-60px] cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <LeftOutlined />
    </div>
    <div
      @click="slide('right')"
      class="right w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center absolute top-[calc(50%-20px)] right-[-60px] cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <RightOutlined />
    </div>
    <div class="w-full overflow-hidden" ref="sliderWrapper">
      <div class="w-auto flex flex-shrink-0 gap-5">
        <div
          v-for="(slide, i) in sliderItems"
          :key="i"
          class="product-card shadow-sm border border-gray-50 flex flex-col flex-shrink-0 p-3 bg-white overflow-hidden max-h-[350px]"
          :style="{ width: `${itemsWidth}px`, height: `${itemsWidth && itemsWidth * 1.3}px` }"
        >
          <div
            class="border-gray-100 rounded-sm overflow-hidden h-3/4 max-w-full"
            :style="{ width: `${itemsWidth}px` }"
          >
            <img class="w-full h-full" :src="slide.image" alt="" />
          </div>
          <div class="w-full p-2 h-1/2 flex flex-col justify-between">
            <div class="flex flex-col gap-2 items-start">
              <span class="text-md font-semibold">{{ slide.title }}</span>
              <a-rate :value="slide.rate" disabled style="font-size: 15px" allow-half />
            </div>
            <h4 class="text-xl font-semibold">{{ slide.price }}₺</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
@/types/components/Slider
