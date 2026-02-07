<template>
  <n-layout-content
    :content-style="{
      padding: '24px',
      height: 'calc(100vh - var(--header-height) - var(--footer-height))',
    }"
    style="flex: 1; overflow: auto"
  >
    <router-view />
  </n-layout-content>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
