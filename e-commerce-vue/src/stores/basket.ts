import type { IProductBasket } from '@/types/components/ProductBasket';
import { apiService } from '@/utils/apiService';
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import router from '@/router';

const authStore = useAuthStore()
const activeSession = authStore.getSession
export const useBasketStore = defineStore('basket', {
    // state
    state: (): any => {
        return {
            basket: authStore.getSession.basket || []
        };
    },
    getters: {
       getBasket(state:any) {
         return state.basket
       },
       getBasketCount(state:any) {
        return state.basket.length
       },
       getTotalPrice(state:any) {
        return state.basket.reduce((pre:any, curr:IProductBasket) => pre + (curr.price * curr.amount), 0)
       }
    },
    actions: {
        async addItemToBasket(payload:IProductBasket) {
            if(authStore.hasSession) {
                const existingCheckedItem = this.$state.basket.find((item:IProductBasket) => item.id === payload.id)
                if(existingCheckedItem) {
                    const index = this.$state.basket.indexOf(existingCheckedItem)
                    this.$state.basket[index].amount++                
                } else {
                    const item = {...payload, amount: 1}
                    this.$state.basket.push(item)
                }
                await apiService.put(`/users/${activeSession.id}`, {...activeSession, basket: this.$state.basket})
            } else {
                router.push({name: 'login'})
            }
        },
        deleteItemToBasket(payload:IProductBasket) {
            this.$state.basket = this.$state.basket?.filter((prod:IProductBasket) => prod.id !== payload.id)
            this.refreshBasket()
        },
        clearBasket() {
            this.$state.basket = []
        },
        async refreshBasket() {
            await apiService.put(`/users/${activeSession.id}`, {...activeSession, basket: this.$state.basket})
        }
    }
})
