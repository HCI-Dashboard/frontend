<template>
  <div class="main-view">
    <n-row>
      <ClusterSlotComponent title="내부망 클러스터" />
    </n-row>
    <n-divider />
    <n-row>
      <ClusterSlotComponent title="외부망 클러스터" />
    </n-row>
  </div>
</template>
<script lang="ts" setup>
import ClusterSlotComponent from "@/components/ClusterSlotComponent.vue";
</script>

<style scoped>
h1 {
  color: #333;
  margin-bottom: 16px;
}
</style>
