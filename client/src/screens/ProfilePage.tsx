import { Calendar, CheckCircle, Mail, MapPin, Phone, User } from "lucide-react";
import { useGetUserQuery } from "../services/apiSlice";
import { useParams } from "react-router-dom";
import CenterLoading from "../components/CenterLoading";
import { formatDate } from "../utils/formatTime";


const ProfilePage = () => {
  const {id} = useParams<{id: string}>();
  if(!id) return;
  const {isLoading: isUserLoading, data: userData}  = useGetUserQuery(id);
 
  const user = userData?.data; 
   

  if(isUserLoading) return <CenterLoading />;
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md md:max-w-lg p-6 md:p-8">
        {/* Avatar */}
        <div className="flex justify-center mb-3 sm:mb-6">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-20 sm:w-28 h-20 sm:h-28 md:w-32 md:h-32 rounded-full border-2 border-blue-500 object-cover"
          />
        </div>

        {/* Username */}
        <h2 className="text-center text-xl  sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {user.username}
        </h2>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-gray-700 text-sm sm:text-base">
          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="truncate">{user.email}</span>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            <span>{user.mobile}</span>
          </div>

          {/* Gender */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
            <span>{user.gender}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            <span>{user.location}</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            <span>{user.status}</span>
          </div>
        </div>

        {/* Dates */}
        <div className="mt-6 text-gray-500 text-xs sm:text-sm space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>
              Date Created: {formatDate(user.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>
              Date Updated:{" "}
              {formatDate(user.updatedAt)}
            </span>
          </div>
        </div>

        {/* Optional: Action Button */}
        {/* <div className="mt-6 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all text-sm md:text-base">
            Edit Profile
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProfilePage;
