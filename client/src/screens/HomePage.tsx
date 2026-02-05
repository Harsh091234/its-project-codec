import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserTable from "../features/Home/components/UserTable";
import { Plus } from "lucide-react";
import { useGetUsersQuery } from "../services/apiSlice";
import type { User } from "../types/user.types";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {isLoading: isUsersLoading, data: usersData} = useGetUsersQuery(undefined);
  const users =  usersData?.data?? [];
  

const filteredUsers = users.filter((u: User) => {
  const fullName = `${u.firstName ?? ""} ${u.lastName ?? ""}`;
  return (
    fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );
});

  return (
    <div className="p-8 flex-1 ">
      <div className="flex flex-col  sm:flex-row sm:justify-between sm:items-center mb-4">
        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={() => {}}
        />
        <button
        onClick={() => navigate("/register")}
          className="max-w-full
      sm:max-w-30 w-full  mt-2 py-2 px-2 
      rounded-lg text-xs sm:text-sm
      text-white font-medium
      transition-all
      bg-gradient-to-r from-blue-500 to-blue-700
      hover:from-blue-600 hover:to-blue-800
      disabled:opacity-60 disabled:cursor-not-allowed
    "
        >
          <Plus className="inline-block  w-4 h-4 mr-1 mb-0.5" />
          New User
        </button>
      </div>
      {isUsersLoading ? <>loading...</> : <UserTable users={filteredUsers} />}
    </div>
  );
};

export default HomePage;
