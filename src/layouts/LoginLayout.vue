<template>
  <n-card title="Login">
    <n-input
      v-model:value="username"
      type="text"
      placeholder="Username"
      :maxlength="20"
    />

    <n-input
      v-model:value="password"
      type="password"
      show-password-on="mousedown"
      placeholder="Password"
      :maxlength="20"
    />

    <n-button v-on:click="loginSubmit" type="primary" block>Login</n-button>
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import userService from '@/services/user-service';

const username = ref<string>('');
const password = ref<string>('');

async function loginSubmit() {
  await userService.login(username.value, password.value);
}
</script>
