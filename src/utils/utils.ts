import { upload } from "../cloudinary";

export async function getPublicIDFromURL(rawData: string) {
  const response = await upload(rawData);
  return { publicID: response.public_id };
}
