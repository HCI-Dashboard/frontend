<template>
  <div class="main-view">
    <h1>{{ title }}</h1>
    <p>{{ contents }}</p>
    <DoughnutChartComponent title="클러스터 상태" :data="[300, 50, 100]" />
  </div>
</template>
<script lang="ts" setup>
import DoughnutChartComponent from "@/components/DoughnutChartComponent.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const title = computed(() => route.meta.title || "Main View");
const contents = ref("Hello, this is the main view content.");
</script>

<style scoped>
h1 {
  color: #333;
  margin-bottom: 16px;
}
</style>
