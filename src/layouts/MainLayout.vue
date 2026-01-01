<template>
  <n-config-provider>
    <n-layout has-sider style="height: 100vh;">
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
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout style="height: 100vh; display: flex; flex-direction: column;">
        <n-layout-header bordered style="height: var(--header-height); display: flex; align-items: center; padding: 0 24px;">
          <div>This is header</div>
        </n-layout-header>
        <n-layout-content :content-style="{ padding: '24px', height: 'calc(100vh - var(--header-height) - var(--footer-height))' }" style="flex: 1; overflow: auto;">
          <router-view />
        </n-layout-content>
        <n-layout-footer bordered style="height: var(--footer-height); display: flex; align-items: center; padding: 0 24px;">
          This is footer
        </n-layout-footer>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'
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
        label: 'Main Menu 1',
        key: 'main1',
        children: [
          {
            label: () => h(RouterLink, { to: { name: 'sub-nav 1', query: { lang: 'ko-KR' } } }, {  default: () => 'Sub Menu 1' }),
            key: 'sub1-1'
          },
          {
            label: () => h(RouterLink, { to: { name: 'sub-nav 2', query: { lang: 'ko-KR' } } }, {  default: () => 'Sub Menu 2' }),
            key: 'sub1-2'
          }
        ]
      },
      {
        label: 'Main Menu 2',
        key: 'main2',
        children: [
          {
            label: () => h(RouterLink, { to: { name: 'sub-nav 3', query: { lang: 'ko-KR' } } }, {  default: () => 'Sub Menu 3' }),
            key: 'sub2-1'
          },
          {
            label: () => h(RouterLink, { to: { name: 'sub-nav 4', query: { lang: 'ko-KR' } } }, {  default: () => 'Sub Menu 4' }),
            key: 'sub2-2'
          }
        ]
      },
      {
        label: 'Main Menu 3',
        key: 'main3',
        children: [
          {
            label: () => h(RouterLink, { to: { name: 'sub-nav 5', query: { lang: 'ko-KR' } } }, {  default: () => 'Sub Menu 5' }),
            key: 'sub3-1'
          },
          {
            label: () => h(RouterLink, { to: { name: 'sub-nav 6', query: { lang: 'ko-KR' } } }, {  default: () => 'Sub Menu 6' }),
            key: 'sub3-2'
          }
        ]
      }
    ]
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
