<template>
  <n-card>
    <div style="text-align: center; max-width: 260px; margin: auto">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Chart, registerables } from "chart.js";

// Props 정의
interface Props {
  title: string;
  data: number[];
  labels?: string[];
  backgroundColor?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  labels: () => ["정상", "경고", "이상"],
  backgroundColor: () => ["rgb(25, 135, 84)", "rgb(255, 193, 7)", "rgb(220, 53, 69)"],
});

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

Chart.register(...registerables);

const createChart = () => {
  if (!chartCanvas.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: "doughnut",
    data: {
      labels: props.labels,
      datasets: [
        {
          label: props.title,
          data: props.data,
          backgroundColor: props.backgroundColor,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: 14,
            },
          },
        },
        title: {
          display: true,
          text: props.title,
          font: {
            size: 18,
          },
        },
      },
    },
  });
};

onMounted(() => {
  createChart();
});

// Props 변경 감지
watch(
  () => [props.data, props.labels, props.backgroundColor, props.title],
  () => {
    createChart();
  },
  { deep: true },
);
</script>
