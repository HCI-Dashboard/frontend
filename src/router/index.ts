import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import LoginLayout from "@/layouts/LoginLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
      meta: { title: "Main View" },
    },
    {
      path: "/login",
      name: "login",
      component: LoginLayout,
      meta: { title: "Login" }
    }
  ],
});

export default router;
