import { encrypt } from "../utils";
import { UserRepository } from "./user.repository";

interface UserSignUpProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  gender: string;
}

export async function getAllUsers() {
  return await UserRepository.find();
}

export async function getUserById(id: number) {
  return await UserRepository.findOneBy({
    id,
  });
}

export async function getUserByUsername(username: string) {
  return await UserRepository.findOneBy({
    username,
  });
}

export async function signUpUser({
  firstName,
  lastName,
  email,
  username,
  password,
  gender,
}: UserSignUpProps) {
  const hashedPassword = await encrypt(password);
  const user = await UserRepository.create({
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword,
    gender,
  });

  await UserRepository.save(user);
}

export async function getUserDetailsByUserName(username: string) {
  return await UserRepository.findOne({
    where: {
      username,
    },
    relations: {
      posts: true,
    },
  });
}

export async function getUserPostsMedia(username: string) {
  return await UserRepository.createQueryBuilder("user")
    .innerJoinAndSelect("user.posts", "post")
    .innerJoinAndSelect("post.medias", "media")
    .where("user.username = :username", { username })
    .orderBy("post.createdAt", "DESC")
    .getOne();
}
