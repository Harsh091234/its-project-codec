import { Upload } from "lucide-react";
import { type FC, useState } from "react";
import UserActionsPanel from "./panels/UserActionsPanel";
import type { User } from "../../../types/user.types";
import { useNavigate } from "react-router-dom";



interface UserTableProps {
  users: User[];
}

const UserTable: FC<UserTableProps> = ({ users }) => {
  const [genderFilter, setGenderFilter] = useState<"All" | "Male" | "Female">(
    "All",
  );
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [sortAsc, setSortAsc] = useState(true);

  const genders: ("All" | "Male" | "Female")[] = ["All", "Male", "Female"];
  const statuses: ("All" | "Active" | "Inactive")[] = [
    "All",
    "Active",
    "Inactive",
  ];
const [openUserId, setOpenUserId] = useState<string | null>(null);

  const filteredUsers = users
    .filter(
      (u) =>
        (genderFilter === "All" || u.gender === genderFilter) &&
        (statusFilter === "All" || u.status === statusFilter),
    )
    .sort((a, b) =>
      sortAsc ? a._id.localeCompare(b._id) : b._id.localeCompare(a._id),
    );

    const navigate = useNavigate();

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,FullName,Email,Gender,Status"]
        .concat(
          filteredUsers.map(
            (u) => `${u._id},${u.firstName + u.lastName},${u.email},${u.gender},${u.status}`,
          ),
        )
        .join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Filters + Export */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-10">
          {/* Gender Filter */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700">Gender:</span>
            {genders.map((g) => (
              <label
                key={g}
                className="flex items-center gap-1 text-gray-600 cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={genderFilter === g}
                  onChange={() => setGenderFilter(g)}
                  className="accent-green-500"
                />
                {g}
              </label>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700">Status:</span>
            {statuses.map((s) => (
              <label
                key={s}
                className="flex items-center gap-1 text-gray-600 cursor-pointer"
              >
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={statusFilter === s}
                  onChange={() => setStatusFilter(s)} // ✅ fixed
                  className="accent-green-500"
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={exportCSV}
          className="flex text-sm items-center gap-2 
             bg-gradient-to-r from-green-400 to-green-600
             hover:from-green-500 hover:to-green-700
             text-white px-5 py-2 rounded-lg font-medium
             transition shadow-md hover:shadow-lg"
        >
          <Upload className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th
                className="px-4 py-2 text-left cursor-pointer select-none"
                onClick={() => setSortAsc(!sortAsc)}
              >
                ID {sortAsc ? "▲" : "▼"}
              </th>
              <th className="px-2 py-2 text-left">Profile</th>
              <th className="px-2 py-2 text-left">Full Name</th>
              <th className="px-2 py-2 text-left">Email</th>
              <th className="px-2 py-2 text-left">Gender</th>
              <th className="px-2 py-2 text-left">Status</th>
              <th className="px-2 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <td className="px-2 py-3">{user._id}</td>

                {/* Profile Avatar */}
                <td className="px-2 py-3">
                  <img
                    src={user.profileImage || "https://i.pravatar.cc/40?img=1"}
                    alt={user.firstName + user.lastName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-neutral-200"
                  />
                </td>

                <td className="px-2 py-3 break-words max-w-50">
                  {user.firstName + user.lastName}
                </td>
                <td
                  className="px-2 py-3 truncate max-w-xs text-gray-600"
                  title={user.email}
                >
                  {user.email}
                </td>
                <td className="px-2 py-3">{user.gender}</td>
                <td className="px-2 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-2  py-3 text-center">
                  <button
                    onClick={() =>
                      setOpenUserId(openUserId === user._id ? null : user._id)
                    }
                    className="p-2 relative rounded-full hover:bg-gray-100 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v.01M12 12v.01M12 18v.01"
                      />
                    </svg>
                    {openUserId === user._id && (
                      <UserActionsPanel
                        onView={() => navigate(`/profile/${user._id}`)}
                        onEdit={() => alert("Edit clicked")}
                        onDelete={() => alert("Delete clicked")}
                      />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-md p-4 space-y-3"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <img
                src={user.profileImage || "https://i.pravatar.cc/40?img=1"}
                alt={user.firstName + user.lastName}
                className="w-12 h-12 rounded-full border-2 border-neutral-200 object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold text-gray-800 max-w-[220px] wrap-anywhere">
                  {user.firstName + user.lastName}
                </p>
                <p className="text-sm text-gray-500 max-w-[220px] wrap-anywhere">
                  {user.email}
                </p>
              </div>

              {/* Actions */}
              <button
                onClick={() =>
                  setOpenUserId(openUserId === user._id ? null : user._id)
                }
                className="relative p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v.01M12 12v.01M12 18v.01"
                  />
                </svg>

                {openUserId === user._id && (
                  <UserActionsPanel
                    onView={() => navigate(`/profile/${user._id}`)}
                    onEdit={() => alert("Edit clicked")}
                    onDelete={() => alert("Delete clicked")}
                  />
                )}
              </button>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-3 text-sm">
              <div>
                <p className="text-gray-500">ID</p>
                <p className="font-medium">{user._id}</p>
              </div>

              <div>
                <p className="text-gray-500">Gender</p>
                <p className="font-medium">{user.gender}</p>
              </div>

              <div className="col-span-2">
                <p className="text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
