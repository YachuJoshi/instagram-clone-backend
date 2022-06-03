import { Post } from "src/post";
import { MediaRepository } from "./media.respository";

interface MediaType {
  height: number;
  width: number;
  publicID: string;
}

export const createMedia = async (media: MediaType, post: Post) => {
  const { height, width, publicID: url } = media;
  const m = MediaRepository.create({
    height: String(height),
    width: String(width),
    url,
    post,
  });

  await MediaRepository.save(m);
};
