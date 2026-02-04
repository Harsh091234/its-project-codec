import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserTable, { type User } from "../features/Home/components/UserTable";
import { Plus } from "lucide-react";

const demoUsers: User[] = [
  {
    id: "1",
    fullName: "Hardik Mistry",
    email: "hardik@email.com",
    gender: "Male",
    status: "Active",
  },
  {
    id: "2",
    fullName: "Jane Doe",
    email: "jane@email.com",
    gender: "Female",
    status: "Inactive",
  },
  {
    id: "3",
    fullName: "John Smith",
    email: "john@email.com",
    gender: "Male",
    status: "Active",
  },
];

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>(demoUsers);

  const handleSearch = () => {
    const filtered = demoUsers.filter(
      (u) =>
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()),
    );
    setUsers(filtered);
  };

  return (
    <div className="p-4 flex-1 ">
      <div className="flex flex-col  sm:flex-row sm:justify-between sm:items-center mb-4">
        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
        />
        <button
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
      <UserTable users={users} />
    </div>
  );
};

export default HomePage;
