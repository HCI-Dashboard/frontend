<template>
  <a-layout class="main-layout">
    <!-- 사이드바 -->
    <!-- 주의: sider의 width는 내부적으로 인라인 스타일로 지정되므로, style 속성으로 조정할 수 없음 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :width="siderWidth"
      :collapsed-width="0"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu v-for="item in menuItems" :key="item.key">
          <template #title>
            <span>{{ item.label }}</span>
          </template>
          <a-menu-item v-for="subItem in item.children" :key="subItem.key">
            <router-link :to="subItem.uri">
              {{ subItem.label }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- 헤더 -->
      <a-layout-header style="background: #ccc; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>

      <!-- 콘텐츠 -->
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { RouterView, RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import ky from 'ky'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

interface SubMenuItem {
  key: string
  label: string
  uri: string
}

interface MenuItem {
  key: string
  label: string
  children: SubMenuItem[]
}

const menuItems = ref<MenuItem[]>([])
const selectedKeys = ref<string[]>([])
const collapsed = ref<boolean>(false)
const siderWidth = ref<number>(250)

onMounted(async () => {
  try {
    const data = await ky.get('/api/v1/menus').json<MenuItem[]>()
    menuItems.value = data
  } catch (error) {
    console.error('Failed to fetch menus:', error)
  }
})
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
