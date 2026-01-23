import router from "@/router";
import type { Menu } from "@/types/menu";

export default async function initRoutes() {
  try {
    const res = await fetch("/api/v1/menus");
    if (!res.ok) {
      console.warn("Failed to fetch menus:", res.status);
      return;
    }
    const menus: Menu[] = await res.json();
    for (const menu of menus) {
      if (menu.uri) {
        const path = menu.uri;
        const name = menu.menuNm;
        if (!router.hasRoute(name)) {
          router.addRoute({
            path,
            name,
            component: () => menu.uri === "/login" ? import("@/layouts/LoginLayout.vue") : import("@/layouts/MainLayout.vue"),
            meta: { title: name },
          });
        }
      }
      for (const sub of menu.children || []) {
        const path = sub.uri ? sub.uri : "/";
        const name = sub.menuNm;
        if (!router.hasRoute(name)) {
          router.addRoute({
            path,
            name,
            component: () => import("@/layouts/MainLayout.vue"),
            meta: { title: name },
          });
        }
      }
    }
  } catch (e) {
    console.error("initDynamicRoutesFromApi error", e);
  }
}
