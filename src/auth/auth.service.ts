import { compareHashed, generateToken } from "../utils";
import { UserRepository } from "../user";
import { noUserError, wrongCredentialsError } from "../error";

export async function login(username: string, password: string) {
  // Check if the user exists
  const user = await UserRepository.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    throw noUserError;
  }

  // User exists
  const { password: passwordInDb } = user;

  // Check user credentials
  const isMatched = await compareHashed(password, passwordInDb);

  if (!isMatched) {
    throw wrongCredentialsError;
  }

  return generateToken(user);
}
