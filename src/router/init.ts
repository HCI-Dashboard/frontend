import router from "@/router";
import type { Menu } from "@/types/menu";
import type { RouteRecordRaw } from "vue-router";

// Vite의 glob import로 모든 컴포넌트를 동적으로 로드
const modules = import.meta.glob([
  "@/layouts/**/*.vue",
  "@/pages/**/*.vue",
]);

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

  // component 경로를 Vite glob 키와 매칭
  const componentPath = `/src/${menu.component}.vue`;
  const componentLoader = modules[componentPath];

  if (!componentLoader) {
    console.warn(`Component not found: ${componentPath}`);
    return;
  }

  const route: RouteRecordRaw = {
    path: menu.path,
    name: `route-${menu.id}`,
    component: componentLoader,
    children: [],
    meta: { title: menu.name },
  };

  // 자식 메뉴를 재귀적으로 처리
  const children = allMenus.filter((m) => m.parentId === menu.id);
  if (children.length > 0) {
    route.children = buildChildren(children, allMenus);
  }

  router.addRoute(route);
}

function buildChildren(menus: Menu[], allMenus: Menu[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  for (const menu of menus) {
    if (menu.component) {
      const children = allMenus.filter((m) => m.parentId === menu.id);

      const componentPath = `/src/${menu.component}.vue`;
      const componentLoader = modules[componentPath];

      if (!componentLoader) {
        console.warn(`Component not found: ${componentPath}`);
        continue;
      }

      const route: RouteRecordRaw = {
        path: menu.path,
        name: `route-${menu.id}`,
        component: componentLoader,
        children: [],
        meta: { title: menu.name },
      };

      if (children.length > 0) {
        route.children = buildChildren(children, allMenus);
      }

      routes.push(route);
    } else {
      // component가 없으면 그 자식들을 가져옴
      const grandChildren = allMenus.filter((m) => m.parentId === menu.id);
      routes.push(...buildChildren(grandChildren, allMenus));
    }
  }

  return routes;
}
