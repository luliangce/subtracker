<script lang="ts" setup>
import { cred } from "../api/request";

import * as API from "../api";
import { Toast } from "vant";

defineProps(["show"]);
const $emit = defineEmits(["update:show"]);
const try_login = async () => {
  try {
    await API.info();
    $emit("update:show", false);
    Toast("登录成功");
    return;
  } catch (e) {
    Toast("用户名或密码不正确，请重新输入");
  }
};
</script>
<template>
  <van-dialog :show="show" @confirm="try_login">
    <van-form>
      <van-field v-model="cred.username" label="用户名"></van-field>
      <van-field v-model="cred.password" label="密码" type="password"></van-field>
    </van-form>
  </van-dialog>
</template>
