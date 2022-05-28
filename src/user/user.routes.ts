import { User } from "../user";
import { authenticate } from "../auth";
import { QueryFailedError } from "typeorm";
import { signUpUser, getUserPostsMedia, getAllUsers } from "./user.service";
import { Request, Response, NextFunction, Router } from "express";
import { NoUserError, FieldsMissingError, DuplicateKeyError } from "../error";

type UserRequestBody = Request & {
  body: User;
};

type DataResponse = Response & {
  data?: User;
};

const router = Router();

// Get all users
router.get("/", async (_: Request, res: Response) => {
  const users = await getAllUsers();
  return res.json(users);
});

// Get current user
router.get(
  "/me",
  authenticate,
  (_: Request, res: DataResponse, next: NextFunction) => {
    if (!res.data) {
      return next(NoUserError);
    }

    return res.json(res.data);
  }
);

// Get user by username
router.get(
  "/:username",
  async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    if (!username) return;

    const user = await getUserPostsMedia(username);
    if (!user) {
      return next(NoUserError);
    }
    return res.json(user);
  }
);

// Signup
router.post(
  "/signup",
  async (req: UserRequestBody, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, username, password, gender } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !gender
    ) {
      return next(FieldsMissingError);
    }
    try {
      await signUpUser({
        firstName,
        lastName,
        email,
        username,
        password,
        gender,
      });
      return res.sendStatus(204);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return next(DuplicateKeyError);
      }
    }
  }
);

export default router;
