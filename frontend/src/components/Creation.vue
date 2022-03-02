<script setup lang="ts">
import { Toast } from "vant";
import { reactive } from "vue";
import { create_subscribe } from "../api";
import { SubscribeCreation } from "../schema";
import { usePicker } from "../use";
const emit = defineEmits(["update:show", "success", "cancel"]);
const props = defineProps({
  show: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

const empty = {
  auto_renew: false,
  name: "",
  begin: new Date(),
  end: new Date(),
  renew_period: 30,
  price: "10.0",
};

const new_subscribe = reactive<SubscribeCreation>({
  auto_renew: false,
  name: "",
  begin: new Date(),
  end: new Date(),
  renew_period: 30,
  price: "10.0",
});

const reset = () => {
  Object.assign(new_subscribe, empty);
};

const confrim_create = async () => {
  const response = await create_subscribe(new_subscribe);
  if (response.data.code === 200) {
    Toast.success("添加成功");
    emit("success", response.data.data);
    reset();
  }
};

const dt_picker = usePicker(new_subscribe);
const period_picker = usePicker(new_subscribe);
const format = (date: Date) => {
  return date.toLocaleDateString();
};
const format_period = (day_count: any) => {
  return `${day_count}天`;
};
</script>
<template>
  <van-dialog
    :show="props.show"
    @update:show="(value) => $emit('update:show', value)"
    show-cancel-button
    @confirm="confrim_create"
    @cancel="
      () => {
        $emit('cancel', null);
      }
    "
  >
    <div id="creation">
      <van-form>
        <van-cell-group inset>
          <van-field
            v-model="new_subscribe.name"
            name="订阅名称"
            label="订阅名称"
            placeholder="订阅名称"
            :rules="[{ required: true, message: '订阅至少有个名称' }]"
          />
          <van-field
            v-model="new_subscribe.price"
            name="价格"
            label="价格"
            placeholder="价格"
            :rules="[{ required: true, message: '还得有个价格' }]"
          />
          <van-field
            :model-value="format(new_subscribe.begin)"
            name="开始时间"
            label="开始时间"
            readonly
            @click="dt_picker.begin_pick('begin', new_subscribe.begin)"
          />
          <van-field
            :model-value="format(new_subscribe.end)"
            name="到期时间"
            label="到期时间"
            @click="dt_picker.begin_pick('end', new_subscribe.end)"
            readonly
          />
          <van-field label="自动续费">
            <template #input>
              <van-checkbox
                v-model="new_subscribe.auto_renew"
                shape="square"
              ></van-checkbox>
            </template>
          </van-field>
          <van-field
            v-if="new_subscribe.auto_renew"
            :model-value="format_period(new_subscribe.renew_period)"
            readonly
            @click="period_picker.begin_pick('renew_period', 30)"
            name="续费周期"
            label="续费周期"
          />
        </van-cell-group>
      </van-form>
    </div>
  </van-dialog>
  <van-popup
    v-model:show="dt_picker.show_picker"
    position="bottom"
    :close-on-click-overlay="false"
  >
    <van-datetime-picker
      v-model="dt_picker.picking.value"
      type="date"
      title="选择年月日"
      @confirm="dt_picker.confirm_pick"
      @cancel="dt_picker.show_picker = false"
    ></van-datetime-picker>
  </van-popup>
  <van-popup
    v-model:show="period_picker.show_picker"
    position="bottom"
    :close-on-click-overlay="false"
  >
    <van-picker
      :columns="[
        { text: '30天', value: 30 },
        { text: '90天', value: 90 },
        { text: '365天', value: 365 },
      ]"
      title="续订时间"
      @confirm="period_picker.confirm_pick"
      @cancel="period_picker.show_picker = false"
    ></van-picker>
  </van-popup>
</template>

<style lang="less" scoped>
#creation {
  padding: 5vw;
}
</style>
