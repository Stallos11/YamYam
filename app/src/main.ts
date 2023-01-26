import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueAxentix from "@axentix/vue";

const app = createApp(App);
app.use(VueAxentix);
app.mount("#app");
