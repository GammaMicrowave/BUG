import {
  response_200,
  response_500,
  response_400,
} from "../utils/responseCodes.js";
import { prisma } from "../config/sql.config.js";

export async function addFollower(req, res) {
  const userId = req.user.id;
  const followerId = req.body.id;
  try {
    const follower = await prisma.user.findUnique({
      where: {
        id: followerId,
      },
    });
    if (!follower) {
      return response_400(res, "Follower not found");
    }
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          connect: {
            id: followerId,
          },
        },
      },
    });
    return response_200(res, "Follower added successfully", user);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function removeFollower(req, res) {
  const userId = req.user.id;
  const followerId = req.body.id;
  try {
    const follower = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!follower) {
      return response_400(res, "Follower not found");
    }
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: {
          disconnect: {
            id: followerId,
          },
        },
      },
      select: {
        id: true,
      },
    });
    return response_200(res, "Follower removed successfully", {
      id: followerId,
    });
  } catch (err) {
    return response_500(res, err);
  }
}

export async function removeFollowing(req, res) {
  const userId = req.user.id;
  const followingId = req.body.id;
  console.log(userId, followingId);
  try {
    const following = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!following) {
      return response_400(res, "Following not found");
    }
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          disconnect: {
            id: followingId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    return response_200(res, "Following removed successfully", {
      id: followingId,
    });
  } catch (err) {
    return response_500(res, err);
  }
}

export async function getFollowersList(req, res) {
  const userId = req.user.id;
  try {
    const followersList = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        followers: {
          select: {
            id: true,
            name: true,
            image: true,
            _count: {
              select: {
                followers: true,
                following: true,
              },
            },
          },
        },
      },
    });
    return response_200(
      res,
      "Followers list fetched successfully",
      followersList
    );
  } catch (err) {
    return response_500(res, err);
  }
}

export async function getFollowingList(req, res) {
  const userId = req.user.id;
  try {
    const followingList = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        following: {
          select: {
            id: true,
            name: true,
            image: true,
            _count: {
              select: {
                followers: true,
                following: true,
              },
            },
          },
        },
      },
    });
    return response_200(
      res,
      "Following list fetched successfully",
      followingList
    );
  } catch (err) {
    return response_500(res, err);
  }
}
