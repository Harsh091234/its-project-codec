import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerUserSchema,
  type RegisterUserValues,
} from "../schemas/registerUserSchema";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const labelClass = "block text-xs sm:text-sm font-medium text-neutral-600 mb-1";

const inputClass =
  "w-full rounded border border-neutral-300 px-3 py-1.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:w-70";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterUserValues>({
    resolver: zodResolver(registerUserSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const gender = watch("gender");

  const onSubmit = (data: RegisterUserValues) => {
   try {
     toast("Form submitted successfully!");
     const imageFile = data.profileImage[0];
    console.log("image", imageFile);
    console.log("Form Data:", data);

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("gender", data.gender);
    formData.append("location", data.location);
    formData.append("profileImage", data.profileImage[0]);
    
  console.log("formdata", formData);
    

  //reset form values
  reset();

}
    
    catch (error: any) {
      const errorMessage = error.data?.message || error.message || "Something went wrong";
    console.log("error", errorMessage);
   }
   
  };
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-0">
      <h2 className="text-2xl sm:text-3xl  text-gray-800 font-medium text-center mb-3 sm:mb-7">
        Register your details
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="

    p-4 sm:p-6
    space-y-4
    sm:space-y-6
    bg-white
    rounded-xl
    shadow-md
    w-full sm:w-fit
  "
      >
        {/* Row 1: First + Last Name */}
        <div className=" flex flex-col sm:flex-row gap-3 sm:gap-10">
          <div className="flex-1">
            <label htmlFor="firstName" className={labelClass}>
              First Name
            </label>
            <input
              id="firstName"
              {...register("firstName")}
              placeholder="First Name"
              className={inputClass}
            />
            <p className="text-xs text-red-500 mt-0.5">
              {errors.firstName?.message}
            </p>
          </div>

          <div className="flex-1">
            <label htmlFor="lastName" className={labelClass}>
              Last Name
            </label>
            <input
              id="lastName"
              {...register("lastName")}
              placeholder="Last Name"
              className={inputClass}
            />
            <p className="text-xs text-red-500 mt-0.5">
              {errors.lastName?.message}
            </p>
          </div>
        </div>

        {/* Row 2: Email + Mobile */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-10">
          <div className="flex-1">
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email Address"
              className={inputClass}
            />
            <p className="text-xs text-red-500 mt-0.5">
              {errors.email?.message}
            </p>
          </div>

          <div className="flex-1">
            <label htmlFor="mobile" className={labelClass}>
              Mobile Number
            </label>
            <input
              id="mobile"
              type="number"
              {...register("mobile")}
              placeholder="Mobile Number"
              className={`${inputClass} appearance-none`}
            />
            <p className="text-xs text-red-500 mt-0.5">
              {errors.mobile?.message}
            </p>
          </div>
        </div>

        {/* Row 3: Gender + Location */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-10">
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-medium text-neutral-600 mb-1">
              Gender
            </p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-xs sm:text-sm">
                <input
                  type="radio"
                  checked={gender === "male"}
                  onChange={() => setValue("gender", "male")}
                />
                Male
              </label>

              <label className="flex items-center gap-2 text-xs sm:text-sm">
                <input
                  type="radio"
                  checked={gender === "female"}
                  onChange={() => setValue("gender", "female")}
                />
                Female
              </label>
            </div>
            <p className="text-xs text-red-500 mt-0.5">
              {errors.gender?.message}
            </p>
          </div>

          <div className="flex-1">
            <label htmlFor="location" className={labelClass}>
              Location
            </label>
            <input
              id="location"
              {...register("location")}
              placeholder="Location"
              className={inputClass}
            />
            <p className="text-xs text-red-500 mt-0.5">
              {errors.location?.message}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="profileImage" className={labelClass}>
            Profile Image
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            {...register("profileImage")}
            className="
      w-full text-xs sm:text-sm
      file:mr-3 file:py-1.5 file:px-3
      file:rounded-md file:border-0
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100
    "
          />
          <p className="text-xs text-red-500 mt-0.5">
            {errors.profileImage?.message as string}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
      w-full mt-2 py-2
      rounded-lg text-xs sm:text-sm
      text-white font-medium
      transition-all
      bg-gradient-to-r from-blue-500 to-blue-700
      hover:from-blue-600 hover:to-blue-800
      disabled:opacity-60 disabled:cursor-not-allowed
    "
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
