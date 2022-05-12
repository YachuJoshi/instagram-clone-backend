import { User } from "../user";
import { createMedia } from "../media";
import { getPublicIDFromURL } from "../utils";
import { PostRepository } from "./post.repository";

export async function createPost(
  mediaURLs: string[],
  caption: string,
  user: User
) {
  const post = PostRepository.create({
    caption,
    user,
  });

  for (const url of mediaURLs) {
    const { publicID } = await getPublicIDFromURL(url);
    await createMedia(publicID, post);
  }
  await PostRepository.save(post);

  return post;
}
