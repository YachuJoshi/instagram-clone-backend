import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { login, refresh, logout } from "./auth.service";
import {
  fieldsMissingError,
  forbiddenError,
  unauthorizedError,
} from "../error";
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

router.delete("/logout", authenticate, logout);

export default router;
