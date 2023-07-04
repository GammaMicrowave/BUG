import { Router } from "express";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import chatRoutes from "./chat.routes.js";
import publicRoutes from "./public.routes.js";
import followRoutes from "./follow.routes.js";
import postRoutes from "./post.routes.js";
var router = Router();

router.use("/auth", authRoutes);
router.use("/public", publicRoutes);
router.use("/user", verifyUser, userRoutes);
router.use("/chat", verifyUser, chatRoutes);
router.use("/follow", verifyUser, followRoutes);
router.use("/post", verifyUser, postRoutes);

export default router;
