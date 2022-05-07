import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { login } from "./auth.service";
import { fieldsMissingError } from "../error";

interface TypedRequestBody<T> extends Request {
  body: T;
}

interface LoginProps {
  username: string;
  password: string;
}

type LoginRequestBody = TypedRequestBody<LoginProps>;

const router = Router();

router.post(
  "/login",
  async (req: LoginRequestBody, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(fieldsMissingError);
    }

    try {
      const data = await login(username, password);
      return res.json(data);
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
