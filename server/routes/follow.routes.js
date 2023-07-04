import {
  addFollower,
  removeFollower,
  removeFollowing,
  getFollowersList,
  getFollowingList,
} from "../controllers/follow.controller.js";

import { Router } from "express";

const followRouter = Router();

followRouter.post("/add-follower", addFollower);
followRouter.post("/remove-follower", removeFollower);
followRouter.post("/remove-following", removeFollowing);
followRouter.get("/followers-list", getFollowersList);
followRouter.get("/following-list", getFollowingList);

export default followRouter;
