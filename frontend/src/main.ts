import { createApp } from "vue";
import App from "./App.vue";
import { registerVant } from "./plugins/vant";

const app = createApp(App);
registerVant(app);
app.mount("#app");
