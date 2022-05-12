import { authenticate } from "../auth";
import { upload } from "../cloudinary";
import { multerUploads } from "../multer";
import DatauriParser from "datauri/parser";
import { Request, Response, NextFunction, Router } from "express";

const router = Router();

router.post(
  "/upload",
  multerUploads,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) return;
    const files = req.files! as Express.Multer.File[];

    const parser = new DatauriParser();
    const contents = files.map(
      (file) => parser.format(".png", file.buffer).content
    ) as string[];

    try {
      const mediaURLS = [];
      for (const content of contents) {
        const response = await upload(content);
        mediaURLS.push({
          height: response.height,
          width: response.width,
          publicId: response.public_id,
        });
      }
      return res.status(200).json(mediaURLS);
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
