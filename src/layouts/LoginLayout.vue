<template>
  <n-grid :cols="12">
    <n-grid-item :offset="4" :span="4">
      <n-card title="Login">
        <!-- username -->
        <n-input v-model:value="username" type="text" placeholder="Username" :maxlength="20" />
        <!-- password -->
        <n-input
          v-model:value="password"
          type="password"
          show-password-on="mousedown"
          placeholder="Password"
          :maxlength="20"
        />
        <n-button v-on:click="loginSubmit" type="primary" block>로그인</n-button>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import userService from "@/services/user-service";

const username = ref<string>("");
const password = ref<string>("");

async function loginSubmit() {
  await userService.login(username.value, password.value);
}
</script>
