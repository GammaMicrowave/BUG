import { Router } from "express";
import {
  getUserData,
  addNewProfileLink,
  deleteProfileLink,
  updateProfileLink,
  updateProfile,
} from "../controllers/user.controller.js";
import { upload } from "../config/multer.config.js";

const userRouter = Router();

userRouter.get("/", getUserData);
userRouter.post("/profile-link", addNewProfileLink);
userRouter.delete("/profile-link", deleteProfileLink);
userRouter.patch("/profile-link", updateProfileLink);
userRouter.patch("/", upload.single("image"), updateProfile);

export default userRouter;
