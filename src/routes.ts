import { Router } from "express";
import { userRoutes } from "./user";
import { authRoutes } from "./auth";
import { postRoutes } from "./post";

const router = Router();
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/posts", postRoutes);

export default router;
