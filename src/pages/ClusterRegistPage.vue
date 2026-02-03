<style scoped>
.text-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <n-card>
    <n-row :gutter="24">
      <n-col span="12">
        <n-space vertical>
          <n-input placeholder="클라우드" v-model:value="cloud" />
          <n-input placeholder="클러스터 이름" v-model:value="clusterName" />
          <n-input placeholder="연결주소" v-model:value="ipAddr" />
          <n-input placeholder="포트" v-model:value="port" />
        </n-space>
      </n-col>
      <n-col span="12">
        <n-space vertical>
          <n-input placeholder="계정" v-model:value="id" />
          <n-input placeholder="비밀번호" type="password" v-model:value="password" />
          <n-button id="test-button" type="primary"> 연결 테스트 </n-button>
          <n-input placeholder="설명" type="textarea" v-model:value="description" />
        </n-space>
      </n-col>
    </n-row>
    <n-divider />
    <n-row gutter="24">
      <n-col span="12">
        <n-space vertical>
          <n-select v-model:value="collectionAdapterValue" :options="collectionAdapterOptions" />
        </n-space>
      </n-col>
      <n-col span="12">
        <n-row align="middle">
          <n-col span="4" class="text-center"> 수집간격 </n-col>
          <n-col span="18">
            <n-input-number placeholder="수집간격" v-model:value="collectionInterval" />
          </n-col>
          <n-col span="2" class="text-center"> 분 </n-col>
        </n-row>
      </n-col>
    </n-row>
    <n-divider />
    <div style="display: flex; justify-content: flex-end">
      <n-space>
        <n-button>취소</n-button>
        <n-button type="info">등록</n-button>
      </n-space>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const cloud = ref("");
const clusterName = ref("");
const ipAddr = ref("");
const port = ref("");
const id = ref("");
const password = ref("");
const description = ref("");
const collectionAdapterValue = ref(null);
const collectionAdapterOptions = ref([
  { label: "Prometheus", value: "prometheus" },
  { label: "Other", value: "other" },
]);
const collectionInterval = ref(1);
</script>
