import { get, update, remove, post } from "@/utils/request";
import { PostAddRounded } from "@mui/icons-material";

export async function getFollowersList(token = null) {
  let res = await get("/follow/followers-list", token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function getFollowingList(token = null) {
  let res = await get("/follow/following-list", token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function addFollower({ id, token = null }) {
  let res = await post("/follow/add-follower", { id }, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function removeFollower({ id, token = null }) {
  console.log(id, token);
  let res = await post("/follow/remove-follower", { id }, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function addFollowing({ id, token = null }) {
  let res = await post("/follow/add-following", { id }, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function removeFollowing({ id, token = null }) {
  let res = await post("/follow/remove-following", { id }, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}
