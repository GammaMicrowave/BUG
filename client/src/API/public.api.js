import { get, post, update, remove } from "../utils/request.js";

export async function getUserData({ id, token = null }) {
  let res = await get(`/public/getUserData?id=${id}`, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function getUserPosts({ id, token = null }) {
  let res = await get(`/public/getUserPosts?id=${id}`, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}
