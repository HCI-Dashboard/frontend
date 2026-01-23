import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/v1/menus", () => {
    return HttpResponse.json([
      {
        menuCd: "P01",
        menuNm: "대시보드",
        uri: "/",
        layout: "MainLayout",
      },
      {
        menuCd: "P02",
        menuNm: "클러스터",
        layout: "MainLayout",
        children: [
          { menuCd: "P02-INT", menuNm: "내부망 클러스터", uri: "/cluster/internal", layout: "MainLayout" },
          { menuCd: "P02-EXT", menuNm: "외부망 클러스터", uri: "/cluster/external", layout: "MainLayout" },
        ],
      },
      {
        menuCd: "P06",
        menuNm: "로그인",
        uri: "/login",
        layout: "LoginLayout",
      },
    ]);
  }),
];
