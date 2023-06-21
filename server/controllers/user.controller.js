import { response_200, response_500 } from "../utils/responseCodes.js";
import { prisma } from "../config/sql.config.js";

export async function getUserData(req, res) {
  const userId = req.user.id;
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
        createdAt: true,
        updatedAt: true,
        otherProfiles: {
          select: {
            otherProfileLink: true,
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
    return response_200(res, "User data fetched successfully", userData);
  } catch (err) {
    console.log(err);
    // return response_500(res, err);
  }
}
