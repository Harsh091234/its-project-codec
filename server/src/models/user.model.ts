import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  location: string;
  profileImage: string;
  gender: "Male" | "Female";
  status?: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

// convert first letter to uppercase and rest to lowercase
const toTitleCase = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      match: [/^[A-Za-z]+$/, "First name must contain only letters"],
      set: toTitleCase,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      match: [/^[A-Za-z]+$/, "Last name must contain only letters"],
      set: toTitleCase,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
        "Email can contain only letters, numbers, dots (.) and @",
      ],
    },

    mobile: {
      type: String,
      required: true,
      match: [/^[6-9]\d{9}$/, "Invalid mobile number"],
    },

    location: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      maxlength: 100,
    },

    profileImage: {
      type: String,
      required: true,
    
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", UserSchema);