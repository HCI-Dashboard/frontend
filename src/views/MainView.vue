<template>
  <div class="main-view">
    <h1>{{ title }}</h1>
    <p>{{ contents }}</p>
    <n-row gutter="12">
      <n-col :span="12">
        <DoughnutChartComponent title="클러스터 상태" :data="[300, 50, 100]" />
      </n-col>
      <n-col :span="12">
        <DoughnutChartComponent title="가상머신 상태" :data="[300, 50, 100]" />
      </n-col>
    </n-row>
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
