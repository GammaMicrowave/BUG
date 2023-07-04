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
        viewedProfile: true,
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
    return response_500(res, err);
  }
}

export async function addNewProfileLink(req, res) {
  const userId = req.user.id;
  const { otherProfileLink } = req.body;
  try {
    const newProfileLink = await prisma.otherProfiles.create({
      data: {
        otherProfileLink,
        userId,
      },
    });
    return response_200(res, "Profile link added successfully", newProfileLink);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function deleteProfileLink(req, res) {
  const { profileLinkId } = req.body;
  try {
    const deletedProfileLink = await prisma.otherProfiles.delete({
      where: {
        id: profileLinkId,
      },
    });
    return response_200(
      res,
      "Profile link deleted successfully",
      deletedProfileLink
    );
  } catch (err) {
    return response_500(res, err);
  }
}

export async function updateProfileLink(req, res) {
  const { profileLinkId, otherProfileLink } = req.body;
  try {
    const updatedProfileLink = await prisma.otherProfiles.update({
      where: {
        id: profileLinkId,
      },
      data: {
        otherProfileLink,
      },
    });
    return response_200(
      res,
      "Profile link updated successfully",
      updatedProfileLink
    );
  } catch (err) {
    return response_500(res, err);
  }
}
