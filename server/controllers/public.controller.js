import {
  response_200,
  response_500,
  response_400,
} from "../utils/responseCodes.js";
import { prisma } from "../config/sql.config.js";
import jwt from "jsonwebtoken";
export async function searchAllUsers(req, res) {
  const searchQuery = req.query.q;
  let excludeUsers = req.params.exclude;
  if (!excludeUsers) excludeUsers = "";
  excludeUsers = excludeUsers.split(";");

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchQuery,
            },
          },
          {
            email: {
              contains: searchQuery,
            },
          },
        ],
        email: {
          notIn: excludeUsers,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });
    return response_200(res, "Users fetched successfully", users);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function getUserData(req, res) {
  const token = req.headers["authorization"];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {}
  }

  const userId = req.query.id;
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        bio: true,
        image: true,
        email: true,
        location: true,
        occupation: true,
        viewedProfile: true,
        followers: {
          where: {
            id: req.user ? req.user.id : null,
          },
          select: {
            id: true,
          },
        },
        otherProfiles: {
          select: {
            otherProfileLink: true,
            id: true,
          },
        },
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });

    if (req.user && req.user.id === userId) {
      userData.isMine = true;
    } else {
      userData.isMine = false;
    }
    return response_200(res, "User data fetched successfully", userData);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function getUserPosts(req, res) {
  const userId = req.query.id;
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        image: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const finalPosts = posts.map((post) => {
      post.isMine = true;
      return post;
    });
    return response_200(res, "Posts fetched successfully", finalPosts);
  } catch (err) {
    return response_500(res, err);
  }
}
