import { createApp, markRaw } from 'vue';
import { router } from './router/router';
import App from './App.vue';
import VueAxentix from '@axentix/vue';
import { toast } from './utils/toast';
import { registerAuthMiddleware } from './router/middlewares/auth';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import axios from 'axios';
import { Icon } from '@iconify/vue';
import VueAxios from 'vue-axios';

const app = createApp(App);
app.use(VueAxios, axios);

app.use(VueAxentix);

const apiUrl = import.meta.env.VITE_API_URL as string;
axios.defaults.baseURL = apiUrl ? apiUrl : 'https://api.vleveque.com/';

const pinia = createPinia();
pinia.use(({ store }) => {
  store.axios = markRaw(app.config.globalProperties.axios);
  store.router = markRaw(router);
  store.toast = markRaw(toast);
});
pinia.use(piniaPluginPersistedstate);

app.component('Icon', Icon);
app.provide('toast', toast);

app.use(router);
app.use(pinia);

registerAuthMiddleware(app.config.globalProperties.axios);

app.mount('#app');
