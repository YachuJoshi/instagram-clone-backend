import { User } from "../user";
import { createMedia } from "../media";
import { PostRepository } from "./post.repository";

interface MediaURL {
  height: number;
  width: number;
  publicID: string;
}

export async function createPost(
  mediaURLs: MediaURL[],
  user: User,
  caption: string
) {
  const post = PostRepository.create({
    caption,
    user,
  });
  await PostRepository.save(post);

  for (const media of mediaURLs) {
    await createMedia(media, post);
  }

  return post;
}

export async function getPostById(id: number) {
  return await PostRepository.findOneBy({
    id,
  });
}

export async function getUserPostById(postId: number) {
  return await PostRepository.createQueryBuilder("post")
    .innerJoinAndSelect("post.medias", "media")
    .andWhere("post.id = :postId", { postId })
    .getOne();
}
