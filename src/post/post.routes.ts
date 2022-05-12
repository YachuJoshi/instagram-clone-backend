import DatauriParser from "datauri/parser";
import { authenticate } from "../auth";
import { upload } from "../cloudinary";
import { multerUploads } from "../multer";
import { Request, Response, NextFunction, Router } from "express";

const router = Router();

router.post(
  "/upload",
  multerUploads,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return;

    const parser = new DatauriParser();
    const { content } = parser.format(".png", req.file.buffer);
    if (!content) return;

    try {
      const response = await upload(content);
      console.log(response);
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
