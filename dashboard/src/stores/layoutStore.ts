import { defineStore } from 'pinia'
interface State {
    sidenav: boolean
}

export const useLayoutStore = defineStore('layout', {
    state: (): State => ({
        sidenav: false
    }),
    actions: {
        toggle() { this.sidenav = !this.sidenav }
    }
})