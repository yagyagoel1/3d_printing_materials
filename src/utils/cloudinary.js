import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { logger } from "../index.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    let response;
    if (!process.env.TEST) {
      response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "image",
      });
    } else {
      response = { url: "test-url" };
    }
    //file has been uploaded
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    logger.error("error while uploading image on cloudinary", error);
    fs.unlinkSync(localFilePath); //remove the locally saved file as the operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
