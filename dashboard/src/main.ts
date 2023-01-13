import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { router } from './router/Router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueAxios from 'vue-axios'
import axios from 'axios'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pinia.use(({ store }) => {
    store.axios = markRaw(app.config.globalProperties.axios)
    store.router = markRaw(router)
})
app.use(pinia).use(VueAxios, axios).use(router).mount('#app')