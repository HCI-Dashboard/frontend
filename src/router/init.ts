import router from "@/router";

export default async function initRoutes() {
  try {
    const res = await fetch("/api/v1/menus");
    if (!res.ok) {
      console.warn("Failed to fetch menus:", res.status);
      return;
    }
    const menus = await res.json();
    for (const menu of menus) {
      for (const sub of menu.children || []) {
        const path = sub.uri;
        const name = (sub.uri || sub.key || "").replace(/^\//, "");
        if (!router.hasRoute(name)) {
          router.addRoute({
            path,
            name,
            component: () => import("@/views/MainView.vue"),
            meta: { title: sub.label },
          });
          console.info("Added route", name, path);
        }
      }
    }
  } catch (e) {
    console.error("initDynamicRoutesFromApi error", e);
  }
}
