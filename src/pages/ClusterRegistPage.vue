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
          <n-input placeholder="클라우드" :v-model="cloud" />
          <n-input placeholder="클러스터 이름" :v-model="clusterName" />
          <n-input placeholder="연결주소" :v-model="ipAddr" />
          <n-input placeholder="포트" :v-model="port" />
        </n-space>
      </n-col>
      <n-col span="12">
        <n-space vertical>
          <n-input placeholder="계정" :v-model="id" />
          <n-input placeholder="비밀번호" type="password" :v-model="password" />
          <n-button id="test-button" type="info">
            연결 테스트
          </n-button>
          <n-input placeholder="설명" type="textarea" :v-model="description" />
        </n-space>
      </n-col>
    </n-row>
    <n-divider />
    <n-row gutter="24">
      <n-col span="12">
        <n-space vertical>
          <n-select placeholder="수집어댑터" />
        </n-space>
      </n-col>
      <n-col span="12">
        <n-row align="middle">
          <n-col span="4" class="text-center">
            수집간격
          </n-col>
          <n-col span="18">
            <n-input-number placeholder="수집간격" :v-model="collectionInterval" />
          </n-col>
          <n-col span="2" class="text-center">
            분
          </n-col>
        </n-row>
      </n-col>
    </n-row>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const cloud = ref(null);
const clusterName = ref(null);
const ipAddr = ref(null);
const port = ref(null);
const id = ref(null);
const password = ref(null);
const description = ref(null);
const collectionInterval = ref(1);
</script>
