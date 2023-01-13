import { defineStore } from 'pinia'
interface User {
    name: string;
    role: 'JOCKEY' | 'LOGISTICIAN' | 'ADMIN';
}
interface State {
    user: undefined | null | User,
    token: { expires_at: Date; token: string; type: string; } | null
}

export const useAuthStore = defineStore('auth', {
    persist: true,
    state: (): State => ({
        user: undefined,
        token: null
    }),
    actions: {
        get() {
            this.user = {
                name: 'Joseph',
                role: 'JOCKEY'
            }
        },
        register(email: string, password: string) {
            this.axios.post(`http://api.archi.test/auth/register`, { email, password }).then(res => {
                this.user = res.data.user
                this.token = res.data.token
                this.router.push('/')
            })
        },
        login(email: string, password: string) {
            this.axios.post(`http://api.archi.test/auth/login`, { email, password }).then(res => {
                this.user = res.data.user
                this.token = res.data.token
                this.router.push('/')
            })
        }
    }
})