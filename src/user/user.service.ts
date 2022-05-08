import { Request, Response, NextFunction } from "express";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { encrypt } from "../utils";
import { CustomError } from "../error";
import { QueryFailedError } from "typeorm";
import { noUserError } from "../error";

type UserRequestBody = Request & {
  body: User;
};

type DataResponse = Response & {
  data?: Omit<User, "password">;
};

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

export function getUserDetails(
  _: Request,
  res: DataResponse,
  next: NextFunction
) {
  if (!res.data) {
    return next(noUserError);
  }

  return res.json(res.data);
}
