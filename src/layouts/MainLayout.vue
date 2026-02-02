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
        <div>
          <div class="logo" style="height: 64px; margin-top: 0px; margin-bottom: 0px; text-align: center;"> 대시보드 </div>
        </div>
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
  id: number;
  name: string;
  menuCd: string;
  menuNm: string;
  parentId: number | null;
  component: string;
  path: string;
  children: SubMenuItem[];
}

const collapsed = ref<boolean>(false);
const menuOptions = ref<MenuOption[]>([]);

onMounted(async () => {
  try {
    // 1. API로부터 데이터 로드
    const data = await ky.get("/api/v1/menus").json<MenuItem[]>();

    // 2. 평면 리스트를 트리 구조로 변환
    const mainLayout = data.find((m) => m.id === 1);
    if (mainLayout) {
      menuOptions.value = buildMenuTree(data, mainLayout.id);
    }
  } catch (error) {
    console.error("Failed to fetch menus:", error);
  }
});

function buildMenuTree(allMenus: MenuItem[], parentId: number | null): any[] {
  return allMenus
    .filter((item) => item.parentId === parentId)
    .map((item) => {
      const children = buildMenuTree(allMenus, item.id);

      const label =
        item.component !== "" && !item.component.includes("layouts")
          ? () => h(RouterLink, { to: { path: item.path } }, () => item.name)
          : item.name;

      const menuNode: any = {
        label,
        key: `menu-${item.id}`, // 고유 키
      };

      // 자식이 있으면 children 속성 추가
      if (children.length > 0) {
        menuNode.children = children;
      }

      return menuNode;
    });
}
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
