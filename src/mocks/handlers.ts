import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/v1/menus", () => {
    return HttpResponse.json([
      { id: 1, parentId: null, name: "메인", path: "/", component: "MainLayout" },
      { id: 2, parentId: 1, name: "메인", path: "", component: "MainPage" },
      { id: 3, parentId: 1, name: "클러스터", path: "", component: "" },
      { id: 4, parentId: 3, name: "내부망 클러스터", path: "cluster/internal", component: "ClusterPage" },
      { id: 5, parentId: 3, name: "외부망 클러스터", path: "cluster/external", component: "ClusterPage" },
      { id: 6, parentId: null, name: "로그인", path: "/login", component: "LoginLayout" },
      { id: 7, parentId: 6, name: "로그인", path: "", component: "LoginPage" },
    ]);
  }),
];
