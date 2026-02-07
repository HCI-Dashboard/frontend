<template>
  <n-config-provider>
    <!-- 전체 레이이웃 -->
    <n-layout has-sider style="height: 100vh">
      <!-- 사이드 바 -->
      <sider-component />
      <!-- 메인 레이아웃 -->
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
import { RouterView } from "vue-router";
import SiderComponent from "@/components/SiderComponent.vue";
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
