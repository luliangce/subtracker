import { reactive, ref } from "vue";
import { SubscribeCreation } from "../schema";
import { Subscribe } from "./../schema/index";

export const usePickerBase = (
  form: SubscribeCreation | Subscribe,
  constructor: any = undefined
) => {
  const picking = reactive<{
    field: string;
    value?: any;
    transformer?: Function;
  }>({
    field: "",
  });

  const show_picker = ref(false);
  const begin_pick = (
    field: string,
    default_value: any = undefined,
    transformer: Function | undefined = undefined
  ) => {
    picking.field = field;
    if (constructor && default_value) {
      picking.value = new constructor(default_value);
    } else {
      picking.value = default_value;
    }
    picking.transformer = transformer;
    show_picker.value = true;
  };
  const confirm_pick = (value: any) => {
    //对绑定值做特定转换
    const transform = (value: any) => {
      return picking.transformer ? picking.transformer(value) : value;
    };
    const source = {
      [picking.field]: transform(value?.value || value || picking.value),
    };
    Object.assign(form, source);
    show_picker.value = false;
  };
  return reactive({ show_picker, begin_pick, confirm_pick, picking });
};

export const usePicker = (form: SubscribeCreation | Subscribe) => {
  return usePickerBase(form);
};
export const useDatePicker = (form: SubscribeCreation | Subscribe) => {
  return usePickerBase(form, Date);
};
