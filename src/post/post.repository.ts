import { coreDb } from "../db";
import { Post } from "./post.entity";

export const PostRepository = coreDb.getRepository(Post).extend({});
