import { get, update, remove } from "@/utils/request";

export async function getSelfData(token = null) {
  let res = await get("/user", token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function getFollowersList(token = null) {
  let res = await get("/user/followers", token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function getFollowingList(token = null) {
  let res = await get("/user/following", token);
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


