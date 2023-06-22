import { prisma } from "../config/sql.config.js";
import { uploadImage } from "../utils/image.js";
import {
  response_500,
  response_200,
  response_400,
} from "../utils/responseCodes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
  let { firstName, lastName, bio, email, password } = req.body;
  let image = req.file;
  try {
    if (!firstName || !bio || !email || password.length < 8) {
      return response_400(res, "Some Input fields are invalid");
    }
    if (!lastName) {
      lastName = "";
    }

    let imageUrl =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name: firstName + " " + lastName,
        bio,
        image: imageUrl,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    return response_200(res, "User created", { token });
  } catch (error) {
    return response_500(res, "Server Error", error);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return response_400(res, "Email or Password is missing");
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return response_400(res, "User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response_400(res, "Invalid Credentials");
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    return response_200(res, "User logged in", { token });
  } catch (error) {
    return response_500(res, "Server Error", error);
  }
}
