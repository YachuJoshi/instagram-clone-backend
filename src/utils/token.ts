import jwt from "jsonwebtoken";
import { User } from "../user";

export const generateToken = (data: User) => {
  const accessToken = jwt.sign(
    { data },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { data },
    process.env.REFRESH_TOKEN_SECRET as string
  );

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (accessToken: string) => {
  return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
};

export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
};
