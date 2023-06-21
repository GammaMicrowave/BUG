import { get } from "@/utils/request";

export async function test(token = null) {
  let res = await get("/", token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}
