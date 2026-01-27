import router from "@/router";
import type { Menu } from "@/types/menu";
import type { RouteRecordRaw } from "vue-router";
import { RouterView } from "vue-router"; // 내장된 RouterView 사용

const modules = import.meta.glob(["@/layouts/**/*.vue", "@/pages/**/*.vue"]);

export default async function initRoutes() {
  try {
    const response = await fetch("/api/v1/menus");
    const menus: Menu[] = await response.json();

    // 1. 최상위(Root) 메뉴들을 추출하여 라우트 생성
    const rootMenus = menus.filter((menu) => menu.parentId === null);

    rootMenus.forEach((rootMenu) => {
      const route = buildRouteRecord(rootMenu, menus);
      if (route) {
        router.addRoute(route);
      }
    });
  } catch (error) {
    console.error("Failed to initialize routes:", error);
  }
}

function buildRouteRecord(menu: Menu, allMenus: Menu[]): RouteRecordRaw | null {
  const childrenData = allMenus.filter((m) => m.parentId === menu.id);

  // 컴포넌트 로더 결정
  let component;
  if (menu.component) {
    const componentPath = `/src/${menu.component}.vue`;
    component = modules[componentPath];

    if (!component) {
      console.warn(`[Router] Component not found: ${componentPath}`);
      return null;
    }
  } else {
    // 컴포넌트가 없는데 자식이 있다면, 자식을 보여주기 위한 껍데기(RouterView)를 할당
    // 이렇게 해야 ID 3번 같은 '클릭 불가 메뉴'가 경로 계층을 유지할 수 있습니다.
    component = RouterView;
  }

  const route: RouteRecordRaw = {
    path: menu.path,
    name: `route-${menu.id}`,
    component: component,
    children: [],
    meta: {
      title: menu.name,
      // 클릭 불가능한 메뉴인지 여부를 meta에 저장해두면 UI(사이드바) 그릴 때 편합니다.
      isLayoutOnly: !menu.component,
    },
  };

  // 자식들을 재귀적으로 빌드
  if (childrenData.length > 0) {
    route.children = childrenData
      .map((child) => buildRouteRecord(child, allMenus))
      .filter((r): r is RouteRecordRaw => r !== null);
  }

  return route;
}
