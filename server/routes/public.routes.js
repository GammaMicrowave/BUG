import Router from "express";
import {
  searchAllUsers,
  getUserData,
  getUserPosts,
} from "../controllers/public.controller.js";

const publicRouter = Router();

publicRouter.get("/searchAllUsers", searchAllUsers);
publicRouter.get("/getUserData", getUserData);
publicRouter.get("/getUserPosts", getUserPosts);

export default publicRouter;
