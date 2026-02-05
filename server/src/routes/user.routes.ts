import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerUserSchema } from "../schemas/registerUserSchema.js";
import { upload } from "../config/multer.js";


const router = Router();

router.route("/")
.post(upload.single("profileImage"), validate(registerUserSchema), registerUser);

export default router;