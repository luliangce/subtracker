import { SubscribeCreation } from "./../schema/index";
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

export const create_subscribe = async (
  data: SubscribeCreation
): Response<Subscribe> => {
  return await service.post("/subscribes", {
    ...data,
    begin: data.begin?.toISOString().slice(0, 10),
    end: data.end?.toISOString().slice(0, 10),
  });
};
export const update_subscribe = async (
  subscribe: Subscribe
): Response<Subscribe> => {
  const data: Record<string, any> = { ...subscribe };
  delete data["id"];
  delete data["ct"];
  delete data["mt"];
  return await service.put(`/subscribes/${subscribe.id}`, data);
};
export const delete_subscribe = async (
  sub_id: number | string
): Response<Subscribe> => {
  return await service.delete(`/subscribes/${sub_id}`);
};
