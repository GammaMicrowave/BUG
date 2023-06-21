import { Router } from "express";
import authRoutes from "./auth.routes.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";
import { getUserData } from "../controllers/user.controller.js";
import userRoutes from "./user.routes.js";
import { response_200 } from "../utils/responseCodes.js";
var router = Router();

router.use("/auth", authRoutes);
router.get("/", verifyUser, getUserData);
router.use("/user", verifyUser, userRoutes);
function greet(req, res) {
  return response_200(res, "Hello World");
}

export default router;
