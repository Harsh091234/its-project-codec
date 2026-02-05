import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage(); // for cloudinary uploads

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // optional safety limit (2MB)
  },
});