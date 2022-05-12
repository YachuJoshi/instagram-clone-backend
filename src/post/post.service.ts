import { User } from "../user";
import { createMedia } from "../media";
import { PostRepository } from "./post.repository";

export async function createPost(
  mediaURLs: string[],
  user: User,
  caption: string
) {
  const post = PostRepository.create({
    caption,
    user,
  });
  await PostRepository.save(post);

  for (const url of mediaURLs) {
    await createMedia(url, post);
  }

  return post;
}
