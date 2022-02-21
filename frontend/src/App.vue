<script setup lang="ts">
import { onMounted, ref } from "vue";
import { login, subscribes } from "./api";
import { Subscribe } from "./schema";
const subscribes_list = ref<Subscribe[]>([]);
const fetch_data = async () => {
  const response = await subscribes({});
  if (response.status === 200) {
    subscribes_list.value = response.data?.data || [];
  }
};
onMounted(() => {
  fetch_data();
});
</script>

<template>
  <div id="main">
    <div id="list" ref="list">
      <div class="sub" v-for="sub in subscribes_list" :key="sub.id">
        {{ sub.name }}
      </div>
    </div>
  </div>
</template>

<style lang="less">
body {
  height: 100vh;
  width: 100vw;
}

#list {
  width: 70vw;
  margin: auto;
  margin-top: 10vh;
  .sub {
    ::after {
      content: "";
      border: 3px solid red;
    }
  }
}
* {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
