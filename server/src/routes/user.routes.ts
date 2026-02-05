import { Router } from "express";
import { getUsers, registerUser, getUser, editUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerUserSchema } from "../schemas/registerUserSchema.js";
import { upload } from "../config/multer.js";


const router = Router();

router.route("/")
.post(upload.single("profileImage"), validate(registerUserSchema), registerUser)

router.route("/users")
.get(getUsers);

router.route("/:id")
.get(getUser)
.patch(upload.single("profileImage"), validate(registerUserSchema),editUser);
export default router;