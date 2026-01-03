<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const chartCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!chartCanvas.value) return;

  new Chart(chartCanvas.value, {
    type: "doughnut",
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverOffset: 4,
        },
      ],
    },
  });
});
</script>
