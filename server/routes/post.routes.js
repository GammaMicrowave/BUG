import { upload } from "../config/multer.config.js";
import { Router } from "express";

import { addPost, getAllPosts } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post("/add", upload.single("image"), addPost);
postRouter.get("/all", getAllPosts);

export default postRouter;
