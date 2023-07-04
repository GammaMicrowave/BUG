import { get, post, update, remove } from "../utils/request.js";

export async function addPost({ image, content, token = null }) {
  let imageBlob = null;
  if (image.length != 0) {
    imageBlob = await (await fetch(image[0].src)).blob();
  }
  let body = new FormData();
  body.append("image", imageBlob);
  body.append("content", content);
  let res = await post("/post/add", body, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function getAllPosts(token = null) {
  let res = await get("/post/all", token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}
