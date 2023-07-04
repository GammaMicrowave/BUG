// import { get, post, logout } from "./request.js";
import { get, post, logout } from "../utils/request.js";
// import cookieCutter from "cookie-cutter";

export async function signUpUser({
  firstName,
  lastName,
  bio,
  image,
  email,
  password,
}) {
  let imageBlob = await (await fetch(image[0].src)).blob();
  let body = new FormData();
  body.append("image", imageBlob);
  body.append("firstName", firstName);
  body.append("lastName", lastName);
  body.append("bio", bio);
  body.append("email", email);
  body.append("password", password);

  let res = await post("/auth/signup", body);

  if (res.status === 200) {
    // cookieCutter.set("jwt_token", res.data.token);
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}

export async function signInUser({ email, password }) {
  let res = await post("/auth/signin", { email, password });
  if (res.status === 200) {
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}
