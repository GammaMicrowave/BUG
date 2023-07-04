import { get, update, remove, post } from "@/utils/request";

export async function getSelfData(token = null) {
  let res = await get("/user", token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function addNewProfileLink(data, token = null) {
  let res = await post("/user/profile-link", data, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function deleteProfileLink(data, token = null) {
  let res = await remove("/user/profile-link", data, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function updateProfileLink(data, token = null) {
  let res = await update("/user/profile-link", data, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}
