import { Request, Response, NextFunction } from "express";
import { CustomError } from "./CustomError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.code).send(err.message);
  }

  return res.status(500).send("Internal Server Error");
};
