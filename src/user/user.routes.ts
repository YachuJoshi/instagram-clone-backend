import { Router } from "express";
import { signUpUser } from "./user.service";

const router = Router();

router.post("/signup", signUpUser);

export default router;
