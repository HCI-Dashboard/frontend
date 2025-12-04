import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/v1/menus", () => {
    return HttpResponse.json([
      {
        menuCd: "1",
        menuNm: "nav 1",
        children: [
          { menuCd: "11", menuNm: "sub-nav 1", uri: "/subnav1", layout: "MainLayout" },
          { menuCd: "12", menuNm: "sub-nav 2", uri: "/subnav2", layout: "MainLayout" },
        ],
      },
      {
        menuCd: "2",
        menuNm: "nav 2",
        children: [
          { menuCd: "21", menuNm: "sub-nav 3", uri: "/subnav3", layout: "MainLayout" },
          { menuCd: "22", menuNm: "sub-nav 4", uri: "/subnav4", layout: "MainLayout" },
        ],
      },
      {
        menuCd: "3",
        menuNm: "nav 3",
        children: [
          { menuCd: "31", menuNm: "sub-nav 5", uri: "/subnav5", layout: "MainLayout" },
          { menuCd: "32", menuNm: "sub-nav 6", uri: "/subnav6", layout: "MainLayout" },
        ],
      },
    ]);
  }),
];
