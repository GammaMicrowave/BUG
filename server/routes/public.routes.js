import Router from "express";
import { searchAllUsers } from "../controllers/public.controller.js";

const publicRouter = Router();

publicRouter.get("/searchAllUsers", searchAllUsers);

export default publicRouter;
