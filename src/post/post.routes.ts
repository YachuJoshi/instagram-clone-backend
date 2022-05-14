import { authenticate } from "../auth";
import { upload } from "../cloudinary";
import { multerUploads } from "../multer";
import DatauriParser from "datauri/parser";
import { User, UserRepository } from "../user";
import { noMediaAttachedError } from "../error";
import { createPost } from "../post";
import { Request, Response, NextFunction, Router } from "express";

type DataResponse = Response & {
  data?: Omit<User, "password">;
};

const router = Router();

router.post(
  "/create",
  authenticate,
  multerUploads,
  async (req: Request, res: DataResponse, next: NextFunction) => {
    if (!res.data) return;
    const user = await UserRepository.findBy({
      id: res.data.id,
    });

    if (!req.files) {
      return next(noMediaAttachedError);
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
        const { public_id: publicID } = await upload(content);
        mediaURLs.push(publicID);
      }
      await createPost(mediaURLs, user[0], caption);
      return res.sendStatus(204);
    } catch (e) {
      return next(e);
    }
  }
);

export default router;
