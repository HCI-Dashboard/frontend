<template>
  <n-config-provider>
    <n-layout has-sider style="height: 100vh">
      <!-- 사이드 바 -->
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
      </n-layout-sider>
      <n-layout style="height: 100vh; display: flex; flex-direction: column">
        <!-- 헤더 -->
        <n-layout-header
          bordered
          style="height: var(--header-height); display: flex; align-items: center; padding: 0 24px"
        >
          <div>This is header</div>
        </n-layout-header>

        <!-- 콘텐츠 -->
        <n-layout-content
          :content-style="{
            padding: '24px',
            height: 'calc(100vh - var(--header-height) - var(--footer-height))',
          }"
          style="flex: 1; overflow: auto"
        >
          <router-view />
        </n-layout-content>

        <!-- 푸터 -->
        <n-layout-footer
          bordered
          style="height: var(--footer-height); display: flex; align-items: center; padding: 0 24px"
        >
          This is footer
        </n-layout-footer>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script lang="ts" setup>
import type { MenuOption } from "naive-ui";
import { RouterView, RouterLink } from "vue-router";
import { ref, onMounted, h } from "vue";
import ky from "ky";

interface SubMenuItem {
  menuCd: string;
  menuNm: string;
  uri: string;
}

interface MenuItem {
  menuCd: string;
  menuNm: string;
  uri: string;
  children: SubMenuItem[];
}

const menuItems = ref<MenuItem[]>([]);
const collapsed = ref<boolean>(false);
const menuOptions = ref<MenuOption[]>([]);

onMounted(async () => {
  try {
    const data = await ky.get("/api/v1/menus").json<MenuItem[]>();
    menuItems.value = data;
    menuOptions.value = [
      {
        label: () => h(RouterLink, { to: { path: "/" } }, () => "메인"),
        key: "main",
      },
      {
        label: "클러스터",
        key: "cluster",
        children: [
          {
            label: () => h(RouterLink, { to: { path: "/cluster/internal" } }, () => "내부망"),
            key: "cluster-internal",
          },
          {
            label: () => h(RouterLink, { to: { path: "/cluster/external" } }, () => "외부망"),
            key: "cluster-external",
          },
        ],
      },
      {
        label: () => h(RouterLink, { to: { path: "/login" } }, () => "로그인"),
        key: "login",
      },
    ];
  } catch (error) {
    console.error("Failed to fetch menus:", error);
  }
});
</script>

<style>
:root {
  --header-height: 64px;
  --footer-height: 64px;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.main-layout {
  height: 100vh;
}
</style>
