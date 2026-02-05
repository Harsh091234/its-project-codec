import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { uploadBase64Image } from "../utils/uploadBase64Image.js";
import { CLOUDINARY_FOLDERS } from "../paths/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, mobile, gender, location } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    let profileImage = null;
    if (!req.file) {
      throw new ApiError(400, "Profile image is required");
    }

    const base64String = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64",
    )}`;
    const uploadedImage = await uploadBase64Image(
      base64String,
      CLOUDINARY_FOLDERS.PROFILE_PICS,
    );

    profileImage = uploadedImage.secure_url;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      gender,
      location,
      profileImage,
    });

    return res
      .status(200)
      .json(new ApiResponse(201, "User registered Successfully", newUser));
  },
);

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  if (users.length === 0)
    return res.status(200).json(new ApiResponse(200, "No users found", []));

  return res.status(200).json(new ApiResponse(200, "Users found", users));
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
 
  const user = await User.findById(id);
  return res.status(200).json(new ApiResponse(200, "User found", user));
});

export const editUser = asyncHandler(async(req: Request, res: Response) => {
  const {id} = req.params; 
  if(!id) throw new ApiError(400, "id is required in params");

   const { firstName, lastName, email, mobile, gender, location } = req.body;

   let profileImage = null;
   if (!req.file) {
     throw new ApiError(400, "Profile image is required");
   }

   const base64String = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
     "base64",
   )}`;
   const uploadedImage = await uploadBase64Image(
     base64String,
     CLOUDINARY_FOLDERS.PROFILE_PICS,
   );

   profileImage = uploadedImage.secure_url;

   const updatedUser = await User.findByIdAndUpdate(id,  {
     firstName,
     lastName,
     email,
     mobile,
     gender,
     location,
     profileImage,
   },
  {
    new: true
  });
  if(!updatedUser) throw new ApiError(400, "User not found");

   return res
     .status(200)
     .json(new ApiResponse(201, "User registered Successfully", updatedUser));
})