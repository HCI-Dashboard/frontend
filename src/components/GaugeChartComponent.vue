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

interface Props {
  title: string;
  value: number;
  maxValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxValue: 100,
});

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

// 중앙 텍스트 플러그인 정의
const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart: Chart, _args: unknown, options: { title?: string; value?: string }) {
    const meta = chart.getDatasetMeta(0);
    const firstElement = meta?.data?.[0] as { x?: number; y?: number } | undefined;
    const centerX = firstElement?.x ?? (chart.chartArea.left + chart.chartArea.right) / 2;
    const centerY = firstElement?.y ?? (chart.chartArea.top + chart.chartArea.bottom) / 2;
    const ctx = chart.ctx;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // 값 표시
    ctx.font = "bold 22px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText(options?.value ?? "", centerX, centerY - 8);

    // 제목 표시
    ctx.font = "14px Arial";
    ctx.fillStyle = "#666";
    ctx.fillText(options?.title ?? "", centerX, centerY + 14);

    ctx.restore();
  },
};

Chart.register(...registerables, centerTextPlugin);

const createChart = () => {
  if (!chartCanvas.value) return;

  if (chart) {
    chart.destroy();
  }

  const percentage = (props.value / props.maxValue) * 100;
  const remaining = 100 - percentage;

  // 값 범위에 따라 색상 결정
  let valueColor = "rgb(25, 135, 84)"; // 초록색 (정상)
  if (percentage >= 90) {
    valueColor = "rgb(220, 53, 69)"; // 빨간색 (위험)
  } else if (percentage >= 75) {
    valueColor = "rgb(255, 193, 7)"; // 노란색 (경고)
  }

  chart = new Chart(chartCanvas.value, {
    type: "doughnut",
    data: {
      labels: [props.title, ""],
      datasets: [
        {
          data: [percentage, remaining],
          backgroundColor: [valueColor, "rgba(0, 0, 0, 0.1)"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      circumference: 180,
      rotation: 270,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        centerText: {
          value: `${Number(percentage).toFixed(2)} %`,
          title: props.title,
        },
      },
    },
  });
};

onMounted(() => {
  createChart();
});

watch(
  () => [props.value, props.title, props.maxValue],
  () => {
    createChart();
  },
);
</script>
