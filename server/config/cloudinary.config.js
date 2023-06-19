import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
const cloudinaryContext = cloudinary.v2;

cloudinaryContext.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinaryContext;
