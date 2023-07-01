import { API_URL } from "./contants.config";
import { io } from "socket.io-client";

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
