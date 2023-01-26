import { createApp } from 'vue';
import { router } from './router/router';
import App from './App.vue';
import VueAxentix from '@axentix/vue';

const app = createApp(App);
app.use(VueAxentix);
app.use(router);

app.mount('#app');
