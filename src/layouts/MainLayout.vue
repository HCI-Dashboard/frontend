<style>
:root {
  --header-height: 64px;
  --footer-height: 64px;
}
</style>

<template>
  <n-config-provider>
    <!-- 전체 레이이웃 -->
    <n-layout has-sider style="height: 100vh">
      <!-- 사이드 바 -->
      <sider-component />
      <!-- 메인 레이아웃 -->
      <n-layout style="height: 100vh; display: flex; flex-direction: column">
        <!-- 헤더 -->
        <header-component />
        <!-- 콘텐츠 -->
        <content-component />
        <!-- 푸터 -->
        <footer-component />
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script lang="ts" setup>
import SiderComponent from "@/components/SiderComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ContentComponent from "@/components/ContentComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>
