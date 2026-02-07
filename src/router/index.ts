import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/MainLayout.vue"),
      children: [
        {
          path: "",
          name: "메인",
          component: () => import("@/pages/MainPage.vue"),
        },
        {
          path: "clusters",
          component: () => import("@/layouts/EmptyLayout.vue"),
          children: [
            {
              path: ":clusterId",
              name: "클러스터",
              component: () => import("@/pages/clusters/ClusterPage.vue"),
            },
          ],
        },
        {
          path: "manage",
          component: () => import("@/layouts/EmptyLayout.vue"),
          children: [
            {
              path: "cluster",
              name: "클러스터 관리",
              component: () => import("@/pages/manage/ClusterPage.vue"),
            },
            {
              path: "user",
              name: "사용자 관리",
              component: () => import("@/pages/manage/UserPage.vue"),
            },
            {
              path: "system",
              name: "시스템 관리",
              component: () => import("@/pages/manage/SystemPage.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/layouts/EmptyLayout.vue"),
      children: [
        {
          path: "",
          name: "로그인",
          component: () => import("@/pages/login/LoginPage.vue"),
        },
      ],
    },
  ],
});

export default router;
