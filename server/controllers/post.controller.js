import {
  response_200,
  response_500,
  response_400,
} from "../utils/responseCodes.js";
import { prisma } from "../config/sql.config.js";
import { uploadImage } from "../utils/image.js";

export async function addPost(req, res) {
  let content = req.body.content;
  let image = req.file;
  const author = req.user.id;

  if (!content) content = "";

  let imageUrl = null;

  if (image) {
    imageUrl = await uploadImage(image);
  }

  try {
    const post = await prisma.post.create({
      data: {
        content,
        author: {
          connect: {
            id: author,
          },
        },
        image: imageUrl,
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
    console.log(post);
    return response_200(res, "Post added successfully", post);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
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
            followers: {
              where: {
                id: req.user.id,
              },
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const finalPosts = posts.map((post) => {
      if (post.author.id === req.user.id) {
        post.isMine = true;
      } else {
        post.isMine = false;
      }
      return post;
    });
    return response_200(res, "Posts fetched successfully", finalPosts);
  } catch (err) {
    return response_500(res, err);
  }
}
