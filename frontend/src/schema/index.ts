import { AxiosResponse } from "axios";

export interface R<T> {
  code: number;
  msg: string;
  data?: T;
}

export interface Info {
  id: number;
  username: string;
  date_joined: string;
  last_name: string;
  first_name: string;
}
export interface Subscribe {
  auto_renew: boolean;
  begin: string;
  ct: string;
  end: string;
  id: number;
  mt: string;
  name: string;
  price: string;
  renew_period: number;
}
export type Response<T> = Promise<AxiosResponse<R<T>>>;
