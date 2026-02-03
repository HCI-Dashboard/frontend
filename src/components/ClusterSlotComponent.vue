<template>
  <n-card>
    <n-row>
      <h2>{{ props.title }}</h2>
    </n-row>
    <n-row gutter="12">
      <n-col :span="12">
        <DoughnutChartComponent
          title="호스트 상태"
          :data="hostData"
          :labels="hostLabels"
          :backgroundColor="hostBackgroundColor"
        />
      </n-col>
      <n-col :span="12">
        <DoughnutChartComponent
          title="가상머신 상태"
          :data="vmData"
          :labels="vmLabels"
          :backgroundColor="vmBackgroundColor"
        />
      </n-col>
    </n-row>
  </n-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import DoughnutChartComponent from "@/components/DoughnutChartComponent.vue";
import { PrometheusService } from "@/services/prometheus-service";

const props = defineProps<{
  title: string;
}>();

const hostData = ref<number[]>([2, 1]);
const hostLabels = ["정상", "이상"];
const hostBackgroundColor = ["rgb(25, 135, 84)", "rgb(220, 53, 69)"];

const vmData = ref<number[]>([]);
const vmLabels = ["정상", "중지", "기타"];
const vmBackgroundColor = ["rgb(25, 135, 84)", "rgb(220, 53, 69)", "rgb(128, 128, 128)"];

onMounted(async () => {
  const prometheusService = new PrometheusService();
  const activeCount = await prometheusService.getActiveVmCount();
  const shutoffCount = await prometheusService.getShutoffVmCount();
  const elseCount = await prometheusService.getElseVmCount();

  vmData.value = [activeCount, shutoffCount, elseCount];
});
</script>
