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
  let res = await post("/auth/signup", {
    firstName,
    lastName,
    bio,
    image,
    email,
    password,
  });

  if (res.status === 200) {
    // cookieCutter.set("jwt_token", res.data.token);
    return Promise.resolve(res.data.data);
  } else {
    return Promise.reject(res);
  }
}
