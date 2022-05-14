import { Request, Response, NextFunction, Router } from "express";
import { authenticate } from "../auth";
import { signUpUser, getUserDetailsByUserName } from "./user.service";
import { User } from "../user";
import { noUserError } from "../error";

type DataResponse = Response & {
  data?: Omit<User, "password">;
};

const router = Router();

router.get(
  "/me",
  authenticate,
  (_: Request, res: DataResponse, next: NextFunction) => {
    if (!res.data) {
      return next(noUserError);
    }

    return res.json(res.data);
  }
);

router.get(
  "/:username",
  async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    if (!username) return;

    const user = await getUserDetailsByUserName(username);
    if (!user) {
      return next(noUserError);
    }
    console.log(user);
  }
);

router.post("/signup", signUpUser);

export default router;
