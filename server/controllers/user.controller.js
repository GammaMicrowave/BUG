import { response_200, response_500 } from "../utils/responseCodes.js";
import { prisma } from "../config/sql.config.js";
import { uploadImage } from "../utils/image.js";

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
    return response_200(res, "User data fetched successfully", userData);
  } catch (err) {
    return response_500(res, err);
  }
}


export async function addNewProfileLink(req, res) {
  const userId = req.user.id;
  const { otherProfileLink } = req.body;
  try {
    const newProfileLink = await prisma.otherProfilesUserRelation.create({
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
  console.log(profileLinkId);
  try {
    const deletedProfileLink = await prisma.otherProfilesUserRelation.delete({
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
    const updatedProfileLink = await prisma.otherProfilesUserRelation.update({
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

export async function updateProfile(req, res) {
  const userId = req.user.id;
  const { name, bio, location, occupation } = req.body;
  console.log(req.body);
  const image = req.file;
  try {
    if (image) {
      const newImage = await uploadImage(image);
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          bio,
          location,
          occupation,
          image: newImage,
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
      console.log(updatedUser);
      return response_200(res, "Profile updated successfully", updatedUser);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        bio,
        location,
        occupation,
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
    return response_200(res, "Profile updated successfully", updatedUser);
  } catch (err) {
    response_500(res, err);
  }
}
