import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/v1/menus", () => {
    return HttpResponse.json([
      {
        key: "1",
        label: "nav 1",
        children: [
          { key: "11", label: "sub-nav 1", uri: "/subnav1" },
          { key: "12", label: "sub-nav 2", uri: "/subnav2" },
        ],
      },
      {
        key: "2",
        label: "nav 2",
        children: [
          { key: "21", label: "sub-nav 3", uri: "/subnav3" },
          { key: "22", label: "sub-nav 4", uri: "/subnav4" },
        ],
      },
      {
        key: "3",
        label: "nav 3",
        children: [
          { key: "31", label: "sub-nav 5", uri: "/subnav5" },
          { key: "32", label: "sub-nav 6", uri: "/subnav6" },
        ],
      },
    ]);
  }),
];
