import { get, post, update, remove } from "../utils/request.js";

export async function getAllUsers({ q, token = null }) {
  let res = await get("/chat/search", token, { q });
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function createGroupChat({ chatName, users, token = null }) {
  let res = await post("/chat/group", { chatName, users }, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function fetchAllChats({ q, token = null }) {
  let res = await get("/chat", token, { q });
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function getChat({ chatId, token = null }) {
  let res = await get(`/chat/${chatId}`, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function getPrivateChat({ otherUserId, token = null }) {
  let res = await get(`/chat/private/${otherUserId}`, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function addUserToGroupChat({ chatId, userId, token = null }) {
  let res = await post(`/chat/${chatId}/add-user`, { userId }, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function removeUserFromGroupChat({
  chatId,
  userId,
  token = null,
}) {
  let res = await post(`/chat/${chatId}/remove-user`, { userId }, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function renameGroupChat({ chatId, name, token = null }) {
  let res = await update(`/chat/${chatId}/rename`, { name }, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function makeUserAdminOfGroupChat({
  chatId,
  userId,
  token = null,
}) {
  let res = await update(`/chat/${chatId}/add-admin`, { userId }, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function addMessage({ chatId, message, token = null }) {
  let res = await post(`/chat/${chatId}/message`, { message }, token);
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}
