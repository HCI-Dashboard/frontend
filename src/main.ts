import { createApp } from "vue";
import { createPinia } from "pinia";
import naive from "naive-ui";

import worker from "./mocks/browser";

import App from "./App.vue";
import router from "./router";
import initRoutes from "./router/init";

if (import.meta.env.DEV) {
  // 반드시 worker.start()가 app.mount('#app') 전에 호출되어야 함
  await worker.start();
}

// 메뉴 기반 라우트 초기화 (앱 마운트 전에 완료)
await initRoutes();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(naive);

app.mount("#app");
