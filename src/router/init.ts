import router from "@/router";
import type { Menu } from "@/types/menu";

const componentMap: Record<string, () => Promise<any>> = {
  MainLayout: () => import("@/layouts/MainLayout.vue"),
  LoginLayout: () => import("@/layouts/LoginLayout.vue"),
  MainPage: () => import("@/pages/MainPage.vue"),
  LoginPage: () => import("@/pages/LoginPage.vue"),
  ClusterPage: () => import("@/pages/ClusterPage.vue"),
};

export default async function initRoutes() {
  const response = await fetch("/api/v1/menus");
  const menus: Menu[] = await response.json();

  // parentId가 null인 최상위 메뉴들을 찾아 라우트 생성
  const rootMenus = menus.filter((menu) => menu.parentId === null);

  for (const rootMenu of rootMenus) {
    buildRoute(rootMenu, menus);
  }
}

function buildRoute(menu: Menu, allMenus: Menu[]) {
  if (!menu.component) {
    // component가 없으면 자식들을 재귀적으로 처리
    const children = allMenus.filter((m) => m.parentId === menu.id);
    for (const child of children) {
      buildRoute(child, allMenus);
    }
    return;
  }

  const children = allMenus.filter((m) => m.parentId === menu.id);

  const route: any = {
    path: menu.path,
    name: `route-${menu.id}`,
    component: componentMap[menu.component],
    meta: { title: menu.name },
  };

  // 자식 메뉴를 재귀적으로 처리
  if (children.length > 0) {
    route.children = buildChildren(children, allMenus);
  }

  router.addRoute(route);
}

function buildChildren(menus: Menu[], allMenus: Menu[]): any[] {
  const routes: any[] = [];

  for (const menu of menus) {
    if (!menu.component) {
      // component가 없으면 그 자식들을 가져옴
      const grandChildren = allMenus.filter((m) => m.parentId === menu.id);
      routes.push(...buildChildren(grandChildren, allMenus));
    } else {
      const children = allMenus.filter((m) => m.parentId === menu.id);
      const route: any = {
        path: menu.path,
        name: `route-${menu.id}`,
        component: componentMap[menu.component],
        meta: { title: menu.name },
      };

      if (children.length > 0) {
        route.children = buildChildren(children, allMenus);
      }

      routes.push(route);
    }
  }

  return routes;
}
