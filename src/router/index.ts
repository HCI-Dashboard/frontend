import { createRouter, createWebHistory } from "vue-router";
import LoginLayout from "@/layouts/LoginLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import MainView from "@/views/MainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainLayout,
      meta: { title: "Main View" },
      children: [
        {
          path: "",
          component: MainView,
        },
        {
          path: "/subnav1",
          name: "sub-nav 1",
          component: MainView,
          meta: { title: "sub-nav 1" },
        },
        {
          path: "/subnav2",
          name: "sub-nav 2",
          component: MainView,
          meta: { title: "sub-nav 2" },
        },
        {
          path: "/subnav3",
          name: "sub-nav 3",
          component: MainView,
          meta: { title: "sub-nav 3" },
        },
        {
          path: "/subnav4",
          name: "sub-nav 4",
          component: MainView,
          meta: { title: "sub-nav 4" },
        },
        {
          path: "/subnav5",
          name: "sub-nav 5",
          component: MainView,
          meta: { title: "sub-nav 5" },
        },
        {
          path: "/subnav6",
          name: "sub-nav 6",
          component: MainView,
          meta: { title: "sub-nav 6" },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginLayout,
      meta: { title: "Login" },
    },
  ],
});

export default router;
