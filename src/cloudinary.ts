import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function upload(data: string) {
  return await cloudinary.uploader.upload(data, {
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });
}

export { cloudinary, upload };
