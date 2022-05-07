import jwt from "jsonwebtoken";
import { User } from "../user";

interface UserOmitProps {
  password: string;
}

type Params = Omit<User, keyof UserOmitProps>;

export const generateToken = (data: Params) => {
  const accessToken = jwt.sign(
    { data },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "15s",
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