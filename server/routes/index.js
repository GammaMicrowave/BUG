import { Router } from "express";
import authRoutes from "./auth.routes.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";
import { response_200 } from "../utils/responseCodes.js";
var router = Router();

router.use("/auth", authRoutes);
router.get("/", verifyUser, greet);
function greet(req, res) {
  return response_200(res, "Hello World");
}

export default router;
