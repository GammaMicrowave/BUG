import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export const io = new Server();

export const socketInit = (server) => {
  io.attach(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const token = socket.handshake.auth.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return socket.disconnect(true);
    const userId = decoded.id;
    socket.join(userId);
    console.log("user connected", socket.client.conn.server.clientsCount);
    socket.emit(userId, "You are successfully connected privately");
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.client.conn.server.clientsCount);
    });
  });
};
