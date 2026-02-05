<template>
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
  <n-row gutter="12">
    <n-col :span="12">
      <GaugeChartComponent
        title="CPU"
        :value="108"
        :maxValue="1152"
      />
    </n-col>
    <n-col :span="12">
      <GaugeChartComponent
        title="Memory"
        :value="32800"
        :maxValue="115000"
      />
    </n-col>
  </n-row>
  <n-row>
    <h2>최근 이벤트</h2>
  </n-row>
  <n-row>
    <n-table size="small">
      <thead>
        <tr>
          <th id="event-time">시간</th>
          <th id="event-host">호스트</th>
          <th id="event-content">내용</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2024-06-01 12:00:00</td>
          <td>host1</td>
          <td>호스트가 정상적으로 작동합니다.</td>
        </tr>
        <tr>
          <td>2024-06-01 12:00:00</td>
          <td>host1</td>
          <td>vm-1이 비정상적으로 종료되었습니다.</td>
        </tr>
        <tr>
          <td>2024-06-01 12:00:00</td>
          <td>host1</td>
          <td>vm-1이 새로 추가되었습니다.</td>
        </tr>
        <tr>
          <td>2024-06-01 12:00:00</td>
          <td>host1</td>
          <td>vm-1이 비정상적으로 종료되었습니다.</td>
        </tr>
        <tr>
          <td>2024-06-01 12:00:00</td>
          <td>host1</td>
          <td>vm-1이 새로 추가되었습니다.</td>
        </tr>
      </tbody>
    </n-table>
  </n-row>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import DoughnutChartComponent from "@/components/DoughnutChartComponent.vue";
import { PrometheusService } from "@/services/prometheus-service";
import GaugeChartComponent from "./GaugeChartComponent.vue";

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
