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
