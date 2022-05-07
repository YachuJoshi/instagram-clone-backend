import jwt from "jsonwebtoken";
import { User } from "../user";

export const generateToken = (data: User) => {
  const accessToken = jwt.sign(
    { data },
    process.env.ACCESS_TOKEN_SECRET as string
  );
  const refreshToken = jwt.sign(
    { data },
    process.env.REFRESH_TOKEN_SECRET as string
  );

  return { accessToken, refreshToken };
};
