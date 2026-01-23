import router from "@/router";
import type { Menu } from "@/types/menu";

export default async function initRoutes() {
  try {
    const res = await fetch("/api/v1/menus");
    if (!res.ok) {
      console.warn("메뉴 목록을 불러오는데 실패 했습니다.");
      console.debug(res.status);
      return;
    }
    const menus: Menu[] = await res.json();
    createRoute(menus);
  } catch (e) {
    console.error("메뉴 목록 생성도중 오류가 발생했습니다: ", e);
  }
}

function createRoute(menus: Menu[]) {
  // menus가 null/undefined 이거나 빈 배열일 경우 리턴
  if (!menus?.length) {
    return;
  }

  for (const menu of menus) {
    if (menu.uri) {
      addRoute(menu);
    } else {
      createRoute(menu?.children || []);
    }
  }
}

function addRoute(menu: Menu) {
  // children이 없는 메뉴인 경우, URI가 반드시 존재함
  const path = menu.uri
    ? menu.uri
    : (() => {
        throw new Error("URI가 존재하지 않습니다.");
      })();
  const name = menu.menuNm;
  if (!router.hasRoute(name)) {
    router.addRoute({
      path,
      name,
      component: () =>
        menu.uri === "/login" ? import("@/layouts/LoginLayout.vue") : import("@/layouts/MainLayout.vue"),
      meta: { title: name },
    });
  }
}
