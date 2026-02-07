<style scoped>
.text-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
}

.text-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
}
</style>

<template>
  <n-card>
    <n-row :gutter="24">
      <n-col span="12">
        <n-row>
          <n-col span="24">
            <n-space vertical>
              <n-row gutter="12">
                <n-col span="4" class="text-right">
                  <div>클라우드</div>
                </n-col>
                <n-col span="20">
                  <n-input placeholder="클라우드" v-model:value="cloud" />
                </n-col>
              </n-row>
              <n-row gutter="12">
                <n-col span="4" class="text-right">
                  <div>클러스터 이름</div>
                </n-col>
                <n-col span="20">
                  <n-input placeholder="클러스터 이름" v-model:value="clusterName" />
                </n-col>
              </n-row>
              <n-row gutter="12">
                <n-col span="4" class="text-right">
                  <div>연결정보</div>
                </n-col>
                <n-col span="20">
                  <n-input placeholder="연결주소" v-model:value="ipAddr" />
                </n-col>
              </n-row>
              <n-row gutter="12">
                <n-col span="4" class="text-right">
                  <div>포트</div>
                </n-col>
                <n-col span="20">
                  <n-input placeholder="포트" v-model:value="port" />
                </n-col>
              </n-row>
            </n-space>
          </n-col>
        </n-row>
      </n-col>
      <n-col span="12">
        <n-space vertical>
          <n-row gutter="12">
            <n-col span="4" class="text-right">
              <div>계정</div>
            </n-col>
            <n-col span="20">
              <n-input placeholder="계정" v-model:value="id" />
            </n-col>
          </n-row>
          <n-row gutter="12">
            <n-col span="4" class="text-right">
              <div>비밀번호</div>
            </n-col>
            <n-col span="20">
              <n-input placeholder="비밀번호" type="password" v-model:value="password" />
            </n-col>
          </n-row>
          <n-row gutter="12">
            <n-col span="4" class="text-right">
              <div>설명</div>
            </n-col>
            <n-col span="20">
              <n-input placeholder="설명" type="textarea" v-model:value="description" />
            </n-col>
          </n-row>
          <n-row gutter="12" style="display: flex; justify-content: flex-end">
            <n-col span="20" class="text-right"> * 성공! </n-col>
            <n-col span="4">
              <n-button id="test-button" type="primary">연결 테스트</n-button>
            </n-col>
          </n-row>
        </n-space>
      </n-col>
    </n-row>
    <n-divider />
    <n-row gutter="24">
      <n-col span="12">
        <n-space vertical>
          <n-row gutter="12">
            <n-col span="4" class="text-right">수집어댑터</n-col>
            <n-col span="20">
              <n-select v-model:value="collectionAdapterValue" :options="collectionAdapterOptions" />
            </n-col>
          </n-row>
        </n-space>
      </n-col>
      <n-col span="12">
        <n-row gutter="12">
          <n-col span="4" class="text-right">수집간격</n-col>
          <n-col span="18">
            <n-input-number placeholder="수집간격" v-model:value="collectionInterval" />
          </n-col>
          <n-col span="2" class="text-left">분</n-col>
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
