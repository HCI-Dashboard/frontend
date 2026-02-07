<template>
  <div>
    Cluster Page: {{ clusterId }}
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const clusterId = ref("");

onMounted(() => {
  clusterId.value = route.params.clusterId as string;
  console.log('Cluster ID:', clusterId);
})
</script>
