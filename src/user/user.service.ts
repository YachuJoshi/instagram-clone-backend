import { Request, Response, NextFunction } from "express";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { encrypt } from "../utils";
import { CustomError } from "../error";
import { QueryFailedError } from "typeorm";

interface RequestBody<T> extends Request {
  body: T;
}

type UserRequestBody = RequestBody<User>;

export async function signUpUser(
  req: UserRequestBody,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, username, password, gender } = req.body;

  if (!firstName || !lastName || !email || !username || !password || !gender) {
    return next(
      new CustomError({
        code: 400,
        message: "Fields are missing!",
      })
    );
  }

  const hashedPassword = await encrypt(password);

  try {
    const user = await UserRepository.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      gender,
    });

    await UserRepository.save(user);
    console.log("User Signed Up Successfully!");

    return res.sendStatus(204);
  } catch (e) {
    console.error(e);

    // Narrowing Error Types
    if (e instanceof QueryFailedError) {
      return next(
        new CustomError({
          code: 400,
          message: e.message,
        })
      );
    }

    return next(e);
  }
}
