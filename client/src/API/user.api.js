import { get } from "@/utils/request";

export async function getSelfData(token = null) {
  let res = await get("/user", token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}
