import { defineStore } from 'pinia'
import { apiService } from '@/utils/apiService'
import { v4 as uuid } from 'uuid'
import type { IUser } from '@/types/User'
import router from '@/router'
import TokenService from '@/utils/tokenService'


export const useAuthStore = defineStore('auth', {
    // state
    state: (): any => {
        return {
            session: {},
            isLogedIn: false
        };
    },
    getters: {
        getSession(state:any) {
            return state.session
        },
        hasSession(state:any) {
            return state.isLogedIn
        },
        // for storeToRefs
        addresses(state:any) {
            return state.session.addresses
        },
        cards(state:any) {
            return state.session.cards
        }
    },
    actions: {
        async login(username: string, password:string) {
            const res = await apiService.get('/users', { params: {username, password} })
            this.$state.session = res.data[0]
            this.$state.isLogedIn = true
            TokenService.SaveToken(this.$state.session.id)
            await router.push({name: 'home'})
        },
        async loginWithToken(token:string) {
            const res = await apiService.get('/users', { params: {id: token} })
            this.$state.isLogedIn = true
            this.$state.session = res.data[0]
        },
        async register(payload:Partial<IUser>) {
            const manipulatedPayload = { ...payload, id: uuid(), role: 'USER' }
            try {
                const response = await apiService.post('/users', { ...manipulatedPayload }) 
                this.$state.session = response.data
                const { username, password } = response.data
                await this.login(username, password )
                router.push({name: 'home'})
            } catch (error) {
                console.log(error) 
            }
        },
        async logout() {
            this.$state.session = {}
            this.$state.isLogedIn = false
            TokenService.clearToken()
        },
        async addNewAddress(payload:any) {
            const session = this.$state.session
            apiService.put(`/users/${session.id}`, {...session, addresses: [...session.addresses, payload]})
        },
        async addNewCard(payload:any) {
            const session = this.$state.session
            apiService.put(`/users/${session.id}`, {...session, cards: [...session.cards, payload]})
        }
    }
})
