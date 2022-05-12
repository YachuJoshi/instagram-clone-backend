import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();
const multerUploads = multer({
  storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const fileExt = file.originalname.toLowerCase().split(".").pop() as string;
    const extName = allowedFileTypes.test(fileExt);
    const mimeType = allowedFileTypes.test(file.mimetype);

    if (mimeType && extName) {
      return callback(null, true);
    } else {
      return callback(null, false);
    }
  },
}).array("images", 2);

export { multerUploads };
