import { JwtPayload } from "jsonwebtoken";
import { User, UserRepository, getUserByUsername } from "../user";
import { compareHashed, generateToken, verifyRefreshToken } from "../utils";
import { NoUserError, WrongCredentialsError, ForbiddenError } from "../error";

type DecodedType = JwtPayload & {
  data?: User;
};

export async function login(username: string, password: string) {
  // Check if the user exists
  const user = await getUserByUsername(username);

  if (!user) {
    throw NoUserError;
  }

  // User exists
  const userPassword = await UserRepository.createQueryBuilder("user")
    .select("user.id", "id")
    .where("user.username = :username", { username })
    .addSelect("user.password")
    .getOne();

  if (!userPassword) return;

  const { password: passwordInDb } = userPassword;

  // Check user credentials
  const isMatched = await compareHashed(password, passwordInDb);

  if (!isMatched) {
    throw WrongCredentialsError;
  }

  return generateToken(user);
}

export function refresh(refreshToken: string) {
  try {
    const decoded: DecodedType = verifyRefreshToken(refreshToken) as JwtPayload;

    if (!decoded.data) return;
    return generateToken(decoded.data);
  } catch (e) {
    throw ForbiddenError;
  }
}
