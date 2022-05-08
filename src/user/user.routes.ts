import { Router } from "express";
import { authenticate } from "../auth";
import { signUpUser, getUserDetails } from "./user.service";

const router = Router();

router.get("/me", authenticate, getUserDetails);
router.post("/signup", signUpUser);

export default router;
