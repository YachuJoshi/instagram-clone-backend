import { Request, Response, NextFunction } from "express";
import { encrypt } from "../utils";
import { User } from "./user.entity";
import { QueryFailedError } from "typeorm";
import { UserRepository } from "./user.repository";
import { CustomError } from "../error";

type UserRequestBody = Request & {
  body: User;
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
    return next(QueryFailedError);
  }
}

export async function getUserDetailsByUserName(username: string) {
  return await UserRepository.findOne({
    where: {
      username,
    },
    relations: {
      posts: true,
    },
  });
}
