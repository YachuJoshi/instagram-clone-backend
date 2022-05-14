import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../utils";
import { ForbiddenError, UnauthorizedError } from "../error";
import { User } from "../user";

type DataResponse = Response & {
  data?: User;
};

type DecodedType = JwtPayload & {
  data?: User;
};

export function authenticate(
  req: Request,
  res: DataResponse,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return next(UnauthorizedError);
  }

  try {
    const decoded: DecodedType = verifyAccessToken(accessToken) as JwtPayload;
    res.data = decoded.data;
    return next();
  } catch (e) {
    return next(ForbiddenError);
  }
}
