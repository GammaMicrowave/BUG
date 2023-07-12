import { io } from "socket.io-client";

let API_URL = process.env.BACKEND_API_URL.replace(/\/api$/, "");
API_URL = API_URL || "http://localhost:8080/";

export const socketInit = (token) => {
  const socket = io(API_URL, {
    auth: {
      token,
    },
  });

  socket.on("connect", () => {
    // console.log("connected");
  });
  return socket;
};
