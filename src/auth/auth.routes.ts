import { Request, Response, NextFunction, Router } from "express";
import { User } from "../user";
import {
  noUserError,
  fieldsMissingError,
  forbiddenError,
  unauthorizedError,
} from "../error";
import { login, refresh } from "./auth.service";
import { authenticate } from "./auth.middleware";

interface TypedRequest<T> extends Request {
  body: T;
}

interface LoginProps {
  username: string;
  password: string;
}

interface RefreshProps {
  refreshToken: string;
}

type LoginRequest = TypedRequest<LoginProps>;
type RefreshRequest = TypedRequest<RefreshProps>;
type DataResponse = Response & {
  data?: Omit<User, "password">;
};

const router = Router();

router.post(
  "/login",
  async (req: LoginRequest, res: Response, next: NextFunction) => {
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

router.post(
  "/refresh",
  (req: RefreshRequest, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(unauthorizedError);
    }

    try {
      const data = refresh(refreshToken);
      return res.json(data);
    } catch (e) {
      return next(forbiddenError);
    }
  }
);

router.delete(
  "/logout",
  authenticate,
  (_: Request, res: DataResponse, next: NextFunction) => {
    if (!res.data) {
      return next(noUserError);
    }

    res.data = undefined;
    return res.sendStatus(204);
  }
);

export default router;
