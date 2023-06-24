import { Router } from "express";
import { getAllUsers } from "../controllers/chat.controller.js";

const chatRouter = Router();

chatRouter.get("/search", getAllUsers);

export default chatRouter;
