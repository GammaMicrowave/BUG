import {
  response_200,
  response_500,
  response_400,
} from "../utils/responseCodes.js";
import { prisma } from "../config/sql.config.js";

export async function searchAllUsers(req, res) {
  const searchQuery = req.query.q;
//   console.log(searchQuery);
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
    // console.log(users);
    return response_200(res, "Users fetched successfully", users);
  } catch (err) {
    console.log(err);
    return response_500(res, err);
  }
}

// searchAllUsers({
//   params: {
//     q: "test3@",
//     exclude: "test3@gmail.com;test@gmail.com",
//   },
// });