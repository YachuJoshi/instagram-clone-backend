import { authenticate } from "../auth";
import { upload } from "../cloudinary";
import { multerUploads } from "../multer";
import DatauriParser from "datauri/parser";
import { User, getUserById } from "../user";
import { createPost } from "./post.service";
import { NoMediaAttachedError } from "../error";
import { Request, Response, NextFunction, Router } from "express";

type DataResponse = Response & {
  data?: User;
};

const router = Router();

router.post(
  "/create",
  authenticate,
  multerUploads,
  async (req: Request, res: DataResponse, next: NextFunction) => {
    if (!res.data) return;

    const user = await getUserById(+res.data.id);
    if (!user) return;

    if (!req.files) {
      return next(NoMediaAttachedError);
    }

    const caption = req.body?.caption || "";
    const files = req.files! as Express.Multer.File[];
    const parser = new DatauriParser();

    const contents = files.map(
      (file) => parser.format(".png", file.buffer).content
    ) as string[];

    try {
      const mediaURLs = [];
      for (const content of contents) {
        const { height, width, public_id: publicID } = await upload(content);
        mediaURLs.push({ height, width, publicID });
      }
      await createPost(mediaURLs, user, caption);
      return res.sendStatus(204);
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
