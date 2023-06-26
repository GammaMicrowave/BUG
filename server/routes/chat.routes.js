import { Router } from "express";
import {
  getAllUsers,
  addUserToGroupChat,
  createGroupChat,
  fetchAllChats,
  getChat,
  getPrivateChat,
  makeUserAdminOfGroupChat,
  removeUserFromGroupChat,
  renameGroupChat,
  addMessage,
} from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.get("/search", getAllUsers);
chatRouter.post("/group", createGroupChat);
chatRouter.get("/", fetchAllChats);
chatRouter.get("/:chatId", getChat);
chatRouter.get("/private/:otherUserId", getPrivateChat);
chatRouter.post("/:chatId/add-user", addUserToGroupChat);
chatRouter.post("/:chatId/remove-user", removeUserFromGroupChat);
chatRouter.patch("/:chatId/rename", renameGroupChat);
chatRouter.patch("/:chatId/add-admin", makeUserAdminOfGroupChat);
chatRouter.post("/:chatId/message", addMessage);

export default chatRouter;
