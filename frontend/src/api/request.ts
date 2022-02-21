import axios from "axios";
import { reactive } from "vue";
export const service = axios.create({
  baseURL: (import.meta.env.VITE_BASE_API as string) || "",
  timeout: 5000,
});

export const cred = reactive({
  username: "lu",
  password: "1234",
});

service.interceptors.request.use((config) => {
  config.auth = cred;
  return config;
});
