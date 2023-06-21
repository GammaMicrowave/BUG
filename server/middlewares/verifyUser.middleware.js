import jwt from "jsonwebtoken";
import { response_401, response_500 } from "../utils/responseCodes.js";
import { prisma } from "../config/sql.config.js";

export async function verifyUser(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return response_401(res, "JWT Token is missing");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (!user) return response_401(res, "User not found");
    req.user = user;
    next();
  } catch (err) {
    return response_500(res, err);
  }
}
