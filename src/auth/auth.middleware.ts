import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../utils";
import { forbiddenError, unauthorizedError } from "../error";
import { User } from "../user";

interface UserOmitProps {
  password: string;
}

type DataResponse = Response & {
  data?: Omit<User, keyof UserOmitProps>;
};

type DecodedType = JwtPayload & {
  data?: Omit<User, keyof UserOmitProps>;
};

export function authenticate(
  req: Request,
  res: DataResponse,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return next(unauthorizedError);
  }

  try {
    const decoded: DecodedType = <JwtPayload>verifyAccessToken(accessToken);
    res.data = decoded.data;
    return next();
  } catch (e) {
    return next(forbiddenError);
  }
}
