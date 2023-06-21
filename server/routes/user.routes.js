import { Router } from "express";
import { getUserData } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUserData);

export default userRouter;
