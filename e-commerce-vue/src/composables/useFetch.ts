import { computed, ref, toValue, watchEffect } from "vue";
import { apiService } from "@/utils/apiService";
import type { IPayloadOptions } from "@/types/PayloadOptions";

export function useFetch<T> (endpoint:string,payload:IPayloadOptions) {
    const data = ref<Array<T>|null>(null)
    const error = ref<unknown>(null)
    watchEffect(async () => {
        data.value = null
        error.value = null
        const urlValue = toValue(endpoint)
        try {
            const res = await apiService.get(urlValue, {params: {_sort: payload.sort, _order: payload.order,  _page: payload.page, _limit: payload.limit}})
            console.log(res);
            
            data.value = res.data
        } catch (e) {
          error.value = e
        }
    })
    const totalItems = computed(() => {
      return data.value?.length
    })
    const refresh = async(payload:IPayloadOptions) => {
      const urlValue = toValue(endpoint)
      try {
        const res = await apiService.get(urlValue, {params: {_sort: payload.sort, _order: payload.order, _page: payload.page, _limit: payload.limit}})
        data.value = res.data
      } catch (e) {
        error.value = e
      }
    } 
    return { data, error, totalItems, refresh }
}