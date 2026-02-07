<template>
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
    <!-- 로고 -->
    <div style="height: 64px; display: flex; align-items: center; justify-content: center; margin: 0">
      <img src="/img/popcorn.jpg" alt="Logo" style="max-height: 48px; max-width: 80%; object-fit: contain" />
    </div>
    <n-menu :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
  </n-layout-sider>
</template>
<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { RouterLink } from "vue-router";
import type { MenuOption } from "naive-ui";

const collapsed = ref<boolean>(false);
const menuOptions = ref<MenuOption[]>([]);

onMounted(async () => {
  menuOptions.value = [
    {
      label: () => h(RouterLink, { to: "/" }, { default: () => "메인" }),
      key: "main",
    },
    {
      label: "클러스터",
      key: "clusters",
      children: [
        {
          label: () => h(RouterLink, { to: "/clusters/INTERNAL" }, { default: () => "INTERNAL" }),
          key: "clusters-internal",
        },
        {
          label: () => h(RouterLink, { to: "/clusters/EXTERNAL" }, { default: () => "EXTERNAL" }),
          key: "clusters-external",
        },
      ],
    },
    {
      label: "관리",
      key: "manage",
      children: [
        {
          label: () => h(RouterLink, { to: "/manage/clusters" }, { default: () => "클러스터 관리" }),
          key: "manage-clusters",
        },
        {
          label: () => h(RouterLink, { to: "/manage/users" }, { default: () => "사용자 관리" }),
          key: "manage-users",
        },
        {
          label: () => h(RouterLink, { to: "/manage/system" }, { default: () => "시스템 관리" }),
          key: "manage-system",
        }
      ],
    }
  ]
});

</script>
