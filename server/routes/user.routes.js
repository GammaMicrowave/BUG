import { Router } from "express";
import {
  getUserData,
  addNewProfileLink,
  deleteProfileLink,
  updateProfileLink,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUserData);
userRouter.post("/profile-link", addNewProfileLink);
userRouter.delete("/profile-link", deleteProfileLink);
userRouter.patch("/profile-link", updateProfileLink);

export default userRouter;
