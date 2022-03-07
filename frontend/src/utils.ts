import { computed } from "vue";
import { Subscribe } from "./schema";
export const currency = (
  value?: number | string,
  options: {
    prefix?: string;
    suffix?: string;
  } = {
    prefix: "￥",
  }
) => {
  if (typeof value == "number") {
    value = value.toFixed(2);
  }
  if (value) {
    return `${options.prefix || ""}${value}${options.suffix || ""}`;
  }
};
export const cost_per_day = (sub: Subscribe) => {
  const DAY = 1000 * 60 * 60 * 24;
  let delta =
    (new Date(sub.end).getTime() - new Date(sub.begin).getTime()) / DAY;
  if (delta < 1) delta = 1;
  return parseFloat(sub.price) / delta;
};

export const per_day = (sub: Subscribe) => {
  const per = cost_per_day(sub);
  return currency((Math.round(per * 100) / 100).toFixed(2), {
    prefix: "￥",
    suffix: "/天",
  });
};

export const humanize_expire = (dt: string) => {
  const date = new Date(dt);
  date.setHours(0);
  const now = new Date();

  const days = (date.getTime() - now.getTime()) / 86400000;

  const differ = Math.ceil(Math.abs(days));

  if (date.getTime() < now.getTime()) {
    return `已经过期${differ}天`;
  }

  return `${differ}天后过期`;
};

export const greeting = computed(() => {
  const now = new Date();
  switch (true) {
    case now.getHours() >= 18 || now.getHours() < 2:
      return "晚上好！";
    case now.getHours() >= 12:
      return "下午好！";
    case now.getHours() >= 5:
      return "早上好";
    case now.getHours() >= 2:
      return "修仙呢？？？？";

    default:
      break;
  }

  return "早上好";
});
const paddingLeft = (value: number | string, len = 2) => {
  if (typeof value === "number") {
    value = value.toFixed(0);
  }
  return value.padStart(2, "0");
};
export const date_to_string = (date: Date | undefined | null) => {
  if (!date) {
    return null;
  }
  const result = `${paddingLeft(date.getFullYear())}-${paddingLeft(
    date.getMonth() + 1
  )}-${paddingLeft(date.getDate())}`;
  return result;
};
