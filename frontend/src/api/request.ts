import axios from "axios";
import { Toast } from "vant";
import { reactive, watch } from "vue";
export const service = axios.create({
  baseURL: (import.meta.env.VITE_BASE_API as string) || "",
  timeout: 5000,
});

export const cred = reactive({
  username: "",
  password: "",
});
const read_cred_from_localstorage = () => {
  try {
    const data = JSON.parse(window.localStorage.getItem("cred") || "");
    Object.assign(cred, data);
  } catch (error) {
    // do nothing
  }
};
read_cred_from_localstorage();
watch(
  cred,
  () => {
    //Save Password to LocalStorage during Devlopment
    window.localStorage.setItem("cred", JSON.stringify(cred));
  },
  {
    deep: true,
  }
);

service.interceptors.request.use((config) => {
  config.auth = cred;
  return config;
});

service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      !error.response.config.url.includes("info")
    ) {
      Toast("请先登录");
      return;
    }
    throw error;
  }
);
