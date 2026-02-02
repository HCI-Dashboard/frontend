<template>
  <div class="main-view">
    <h1>{{ title }}</h1>
    <p>{{ contents }}</p>
    <n-row gutter="12">
      <n-col :span="12">
        <DoughnutChartComponent title="클러스터 상태" :data="[300, 50, 100]" />
      </n-col>
      <n-col :span="12">
        <DoughnutChartComponent title="가상머신 상태" :data="vmData" :labels="vmLabels" :backgroundColor="vmColors" />
      </n-col>
    </n-row>
    <n-row gutter="12">
      <n-col :span="12">
        <DoughnutChartComponent title="클러스터 상태" :data="[300, 50, 100]" />
      </n-col>
      <n-col :span="12">
        <DoughnutChartComponent title="가상머신 상태" :data="vmData" :labels="vmLabels" :backgroundColor="vmColors" />
      </n-col>
    </n-row>
  </div>
</template>
<script lang="ts" setup>
import DoughnutChartComponent from "@/components/DoughnutChartComponent.vue";
import { PrometheusService } from "@/services/prometheus-service";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const title = computed(() => route.meta.title || "Main View");
const contents = ref("Hello, this is the main view content.");

const vmData = ref<number[]>([]);
const vmLabels = ["정상", "중지", "기타"];
const vmColors = ["rgb(25, 135, 84)", "rgb(220, 53, 69)", "rgb(128, 128, 128)"];

onMounted(async () => {
  const prometheusService = new PrometheusService();
  const activeCount = await prometheusService.getActiveVmCount();
  const shutoffCount = await prometheusService.getShutoffVmCount();
  const elseCount = await prometheusService.getElseVmCount();

  vmData.value = [activeCount, shutoffCount, elseCount];
});
</script>

<style scoped>
h1 {
  color: #333;
  margin-bottom: 16px;
}
</style>
