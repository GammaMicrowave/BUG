import { Router } from "express";
import authRoutes from "./auth.routes.js";
var router = Router();

router.use("/auth", authRoutes);
router.get("/", greet);
function greet(req, res) {
  res.send("Hello World");
}

export default router;
