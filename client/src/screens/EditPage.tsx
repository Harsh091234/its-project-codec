import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CheckLine, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { editUserSchema, type EditUserValues } from "../schemas/editUserSchema"; // similar to registerUserSchema
import { useEditUserMutation, useGetUserQuery } from "../services/apiSlice";
import CenterLoading from "../components/CenterLoading";

const labelClass = "block text-xs sm:text-sm font-medium text-neutral-600 mb-1";
const inputClass =
  "w-full rounded border border-neutral-300 px-3 py-1.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:w-70";

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const { data: userData, isLoading: isUserLoading } = useGetUserQuery(id!);
  const user = userData?.data;
  const [editUser, { isLoading: isEditing }] = useEditUserMutation();
  const [isSuccessUI, setIsSuccessUI] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditUserValues>({
    resolver: zodResolver(editUserSchema),
  });

  const gender = watch("gender");
  const profileImage = watch("profileImage");

  // Set default values when userData loads
  useEffect(() => {
    if (user) {
    
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        location: user.location,
        profileImage: ""
      });
      setAvatarPreview(user.profileImage || "https://i.pravatar.cc/150?img=1");
    }
  }, [userData, reset]);

  // Update avatar preview when a new file is selected
  useEffect(() => {
    if (profileImage) {
      const file = profileImage[0];
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [profileImage]);

  const onSubmit = async (data: EditUserValues) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      formData.append("gender", data.gender);
      formData.append("location", data.location);
      formData.append("profileImage", data.profileImage[0]);
      

      const res = await editUser({ id:user?._id, data:formData }).unwrap();
      console.log("user", res)
      toast.success("User updated successfully!");

       setIsSuccessUI(true);

         reset();

     setTimeout(() => navigate("/"), 2000)
    } catch (error: any) {
      const message =
        error.data?.message || error.message || error || "Something went wrong";
        console.log("Error: ", message)
   
    }
  };

  if (isUserLoading) {
    return <CenterLoading />
  }

  return (
    <div className="flex-1  flex flex-col items-center justify-center px-4 py-6 sm:px-0">
      <h2 className="text-2xl sm:text-3xl text-gray-800 font-medium text-center mb-2 sm:mb-3">
        Edit User Details
      </h2>

      {/* Avatar Preview */}
      <div className="mb-3  flex justify-center">
        <img
          src={avatarPreview}
          alt="Avatar Preview"
          className="w-20 h-20 bg-white rounded-full object-cover border-2 border-neutral-200"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white rounded-xl shadow-md w-full sm:w-fit"
      >
        {/* Row 1: First + Last Name */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-10">
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
              type="tel"
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
                  checked={gender === "Male"}
                  onChange={() => setValue("gender", "Male")}
                />
                Male
              </label>

              <label className="flex items-center gap-2 text-xs sm:text-sm">
                <input
                  type="radio"
                  checked={gender === "Female"}
                  onChange={() => setValue("gender", "Female")}
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

        {/* Profile Image */}
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
          disabled={!isDirty || isEditing }
          className="
            w-full mt-2 py-2 rounded-lg text-xs sm:text-sm
            text-white font-medium
            transition-all
            bg-gradient-to-r from-blue-500 to-blue-700
            hover:from-blue-600 hover:to-blue-800
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {isEditing ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </span>
          ) : isSuccessUI ? (
            <span className="flex items-center justify-center gap-2">
              Submitted <CheckLine className="h-4 w-4" />
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditPage;
