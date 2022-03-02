<script setup lang="ts">
import { Dialog, Toast } from "vant";
import { computed, onMounted, ref } from "vue";
import { delete_subscribe, subscribes } from "./api";
import { cred } from "./api/request";
import Creation from "./components/Creation.vue";
import Edit from "./components/Edit.vue";
import Login from "./components/Login.vue";
import { Subscribe } from "./schema";
import { cost_per_day, currency, greeting, humanize_expire, per_day } from "./utils";

const subscribes_list = ref<Subscribe[]>([]);
const loading = ref(false);

const fetch_data = async () => {
  loading.value = true;
  try {
    const response = await subscribes({});
    if (response.status === 200) {
      subscribes_list.value = response.data?.data || [];
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const total = computed(() => {
  const value = subscribes_list.value.reduce((prev, current) => {
    const now = new Date();
    if (
      isNaN(parseFloat(current.price)) ||
      !current.renew_period ||
      new Date(current.end).getTime() < now.getTime()
    ) {
      return prev;
    }
    return prev + cost_per_day(current);
  }, 0);
  return currency(value);
});

onMounted(() => {
  fetch_data();
});

const showCreation = ref(false);
const showEdit = ref(false);
const Editing = ref<undefined | Subscribe>();

const handle_edit = (sub: Subscribe) => {
  Editing.value = sub;
  showEdit.value = true;
};

const delete_prompt = async (sub: Subscribe) => {
  try {
    await Dialog.confirm({
      title: `确认删除${sub.name}吗？`,
    });
    await delete_subscribe(sub.id);
    await fetch_data();
    Toast.success("删除成功");
  } catch (e) {
    Toast("取消删除");
  }
};

const show_login_form = ref(false);

onMounted(() => {
  //check if login-required
  if (!cred.password || !cred.username) {
    show_login_form.value = true;
  }
});
</script>

<template>
  <div id="main">
    <div id="summary">
      <div>{{ greeting }}</div>
      <div class="summary-desc">今日订阅消耗</div>
      <div class="summary-num" v-if="!loading">
        {{ total !== "0.00" ? total : "" }}
      </div>
    </div>
    <div id="list" ref="list">
      <div id="list-plus" @click="showCreation = true">+</div>
      <div class="sub" v-for="sub in subscribes_list" :key="sub.id">
        <div style="border-bottom: 1px solid black">
          <van-swipe-cell>
            <template #left>
              <van-button square type="success" @click="handle_edit(sub)" text="修改" />
            </template>
            <div class="sub-content-wrapper">
              <div class="sub-content">
                <div class="sub-name inline-text">
                  {{ sub.name }}
                </div>
                <div v-if="sub.auto_renew">
                  <van-tag type="success">自动续费</van-tag>
                </div>
                <div class="sub-content-right">
                  <div class="inline-text sub-price">{{ per_day(sub) }}</div>
                  <div class="inline-text sub-expire">{{ humanize_expire(sub.end) }}</div>
                </div>
              </div>
            </div>
            <template #right>
              <van-button square type="danger" text="删除" @click="delete_prompt(sub)" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
      <van-empty v-if="!subscribes_list.length" description="空空如也"></van-empty>
    </div>
    <creation v-model:show="showCreation" @success="fetch_data" />
    <edit
      v-if="Editing"
      v-model:show="showEdit"
      :subscribe="Editing"
      @success="fetch_data"
    />
    <login v-model:show="show_login_form" />
  </div>
</template>

<style lang="less">
body {
  padding: 0;
}
#main {
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.inline-text {
  word-wrap: normal;
  white-space: nowrap;
}
#summary {
  margin-top: 5vw;
  height: 50vw;
  width: 100vw;
  text-align: center;
  .summary-desc {
    color: rgba(0, 0, 0, 0.7);
  }
  .summary-num {
    font-size: 3rem;
    color: red;
  }
}
#list {
  position: relative;
  box-sizing: border-box;
  width: 80vw;
  border-radius: 3vw;
  border: solid rgba(0, 0, 0, 0.6) 1px;
  padding: 3vw;
  box-shadow: 2vw 1vw 10vw rgba(0, 0, 0, 0.1);
  * {
    user-select: none;
  }
  #list-plus {
    --height: 15vw;
    --width: var(--height);
    height: var(--height);
    width: var(--height);
    font-size: calc(1 * var(--height));
    line-height: var(--height);
    text-align: center;
    position: absolute;
    top: calc(-0.9 * var(--height));
    right: calc(0 * var(--height));
    text-shadow: 0.5vw 0.5vw 1vw rgba(0, 0, 0, 0.7);
  }

  .sub {
    min-height: 3rem;
    margin-top: 2px;
    margin-bottom: 2px;
    .sub-name {
      font-weight: bolder;
    }
    .sub-content-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sub-content {
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      min-height: 3rem;
      .sub-content-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-around;
        .sub-price {
          color: red;
        }
        .sub-expire {
          color: rgba(0, 0, 0, 0.7);
          font-size: 0.5rem;
        }
      }
    }
  }
}
</style>
