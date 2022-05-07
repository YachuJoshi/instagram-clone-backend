import { compareHashed, generateToken, verifyRefreshToken } from "../utils";
import { UserRepository } from "../user";
import { JwtPayload } from "jsonwebtoken";
import { noUserError, wrongCredentialsError, forbiddenError } from "../error";
import { User } from "../user";

interface UserOmitProps {
  password: string;
}

type DecodedType = JwtPayload & {
  data?: Omit<User, keyof UserOmitProps>;
};

type Params = Omit<User, keyof UserOmitProps>;

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
  const { password: passwordInDb, ...data } = user;

  // Check user credentials
  const isMatched = await compareHashed(password, passwordInDb);

  if (!isMatched) {
    throw wrongCredentialsError;
  }

  return generateToken(data as Params);
}

export function refresh(refreshToken: string) {
  try {
    const decoded: DecodedType = <JwtPayload>verifyRefreshToken(refreshToken);

    if (!decoded.data) return;
    return generateToken(decoded.data);
  } catch (e) {
    throw forbiddenError;
  }
}