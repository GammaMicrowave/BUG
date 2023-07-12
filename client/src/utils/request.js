import axios from "axios";

const API_URL = process.env.BACKEND_API_URL || "http://localhost:8080/api";

const getHeaders = (token, params) => {
  if (token) {
    return {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
      params: params,
    };
  }
  return {
    headers: {
      Accept: "application/json",
    },
    params: params,
  };
};

const get = async (endpoint, token = null, params = null) => {
  try {
    let res = await axios.get(API_URL + endpoint, getHeaders(token, params));
    return res;
  } catch (err) {
    return err.response;
  }
};

const post = async (endpoint, body, token = null, form = false) => {
  let options = getHeaders(token);
  if (form) {
    options.headers["Content-Type"] = "multipart/form-data";
  }
  try {
    return await axios.post(API_URL + endpoint, body, options);
  } catch (err) {
    return err.response;
  }
};

const update = async (endpoint, body, token = null) => {
  try {
    return await axios.patch(API_URL + endpoint, body, getHeaders(token));
  } catch (err) {
    return err.response;
  }
};

const remove = async (endpoint, token = null) => {
  try {
    return await axios.delete(API_URL + endpoint, getHeaders(token));
  } catch (err) {
    return err.response;
  }
};

const logout = () => {
  // removeLS("jwt_token");
  cookieCutter.set("jwt_token", "", { expires: new Date(0) });
};

export { post, get, update, remove, API_URL, getHeaders, logout };
