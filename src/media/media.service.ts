import { Post } from "src/post";
import { MediaRepository } from "./media.respository";

export const createMedia = async (url: string, post: Post) => {
  const media = MediaRepository.create({
    url,
    post,
  });

  await MediaRepository.save(media);
  return media;
};
