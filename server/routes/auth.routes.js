import { signUp, signIn } from "../controllers/auth.controller.js";
import { upload } from "../config/multer.config.js";
import { Router } from "express";

const router = Router();

router.post("/signup", upload.single("image"), signUp);
router.post("/signin", signIn);

export default router;
