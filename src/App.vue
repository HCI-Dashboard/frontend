<template>
  <a-layout class="main-layout">
    <!-- 사이드바 -->
    <!-- 주의: sider의 width는 내부적으로 인라인 스타일로 지정되므로, style 속성으로 조정할 수 없음 -->
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible :width="siderWidth">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <span>{{ item.label }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- 헤더 -->
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>

      <!-- 콘텐츠 -->
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

interface MenuItem {
  key: string
  label: string
}

const menuItems = ref<MenuItem[]>([
  { key: '1', label: 'nav 1' },
  { key: '2', label: 'nav 2' },
  { key: '3', label: 'nav 3' },
])
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
const siderWidth = ref<number>(250)
</script>

<style>
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
