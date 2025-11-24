import 'ant-design-vue/dist/reset.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'

import worker from './mocks/browser'

import App from './App.vue'
import router from './router'

if (import.meta.env.DEV) {
  await worker.start()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
