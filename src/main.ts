import { createApp } from "vue";
import { createPinia } from "pinia";
import naive from "naive-ui";

import worker from "./mocks/browser";

import App from "./App.vue";
import router from "./router";

if (import.meta.env.DEV) {
  // 반드시 worker.start()가 app.mount('#app') 전에 호출되어야 함
  await worker.start();
}

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(naive);

app.mount("#app");
