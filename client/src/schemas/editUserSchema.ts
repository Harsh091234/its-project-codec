import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const editUserSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be atleast 3 characters")
    .regex(/^[A-Za-z\s]+$/, "First name must contain only letters"),
  lastName: z
    .string()
    .min(3, "Last name must be atleast 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Last name must contain only letters"),
  email: z
    .email("Invalid email address")
    .trim()
    .regex(
      /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
      "Email can contain only letters, numbers, dots (.) and @",
    ),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  gender: z
    .enum(["Male", "Female"])
    .refine(Boolean, { message: "Select a gender" }),
  location: z.string().min(2, "Location is required"),
  profileImage: z
      .any()
      .refine((files) => files?.length === 1, "Image is required")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        "Max image size is 2MB"
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only JPG, PNG, WEBP allowed"
      ),
});

export type EditUserValues = z.infer<typeof editUserSchema>;
