import { Router } from "express";
import {
  getUserData,
  getFollowersList,
  getFollowingList,
  addNewProfileLink,
  deleteProfileLink,
  updateProfileLink,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUserData);
userRouter.get("/followers", getFollowersList);
userRouter.get("/following", getFollowingList);
userRouter.post("/profile-link", addNewProfileLink);
userRouter.delete("/profile-link", deleteProfileLink);
userRouter.patch("/profile-link", updateProfileLink);

export default userRouter;
