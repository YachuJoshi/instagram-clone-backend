import { Request, Response, NextFunction, Router } from "express";
import { User } from "../user";
import {
  NoUserError,
  FieldsMissingError,
  ForbiddenError,
  UnauthorizedError,
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

type DataResponse = Response & {
  data?: Omit<User, "password">;
};

type LoginRequest = TypedRequest<LoginProps>;
type RefreshRequest = TypedRequest<RefreshProps>;

const router = Router();

router.post(
  "/login",
  async (req: LoginRequest, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(FieldsMissingError);
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
      return next(UnauthorizedError);
    }

    try {
      const data = refresh(refreshToken);
      return res.json(data);
    } catch (e) {
      return next(ForbiddenError);
    }
  }
);

router.delete(
  "/logout",
  authenticate,
  (_: Request, res: DataResponse, next: NextFunction) => {
    if (!res.data) {
      return next(NoUserError);
    }

    res.data = undefined;
    return res.sendStatus(204);
  }
);

export default router;
