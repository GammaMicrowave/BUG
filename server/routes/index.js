import { Router } from "express";
import authRoutes from "./auth.routes.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";
import userRoutes from "./user.routes.js";
import chatRoutes from "./chat.routes.js";
import publicRoutes from "./public.routes.js";
import followRoutes from "./follow.routes.js";
import { response_200 } from "../utils/responseCodes.js";
var router = Router();

router.use("/auth", authRoutes);
router.use("/user", verifyUser, userRoutes);
router.use("/chat", verifyUser, chatRoutes);
router.use("/public", publicRoutes);
router.use("/follow", verifyUser, followRoutes);

export default router;
