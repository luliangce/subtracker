import { Info, Response, Subscribe } from "../schema";
import { cred as globalCred, service } from "./request";

export const info = async (): Response<Info> => {
  return await service.get("/info");
};

export const login = async (cred: { username: string; password: string }) => {
  Object.assign(globalCred, cred);
  const response = await info();
  if (response.status === 200) {
    return response;
  }
  return null;
};

export const subscribes = async (params: {
  ordering?: string;
}): Response<Subscribe[]> => {
  return await service.get("/subscribes");
};
