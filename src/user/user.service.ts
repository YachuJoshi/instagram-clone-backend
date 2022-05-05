import { Request, Response, NextFunction } from "express";
import { UserRepository } from "./user.repository";
import { encrypt } from "../utils";

interface TypedRequestBody<T> extends Request {
  body: T;
}

type BodyProps = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  gender: string;
};

type UserBody = TypedRequestBody<BodyProps>;

export async function signUpUser(
  req: UserBody,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, username, password, gender } = req.body;
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
    return next(e);
  }
}
