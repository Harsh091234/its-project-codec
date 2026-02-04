import { type FC, useState } from "react";

export interface User {
  id: string;
  fullName: string;
  email: string;
  gender: "Male" | "Female";
  status: "Active" | "Inactive";
}

interface UserTableProps {
  users: User[];
}

const UserTable: FC<UserTableProps> = ({ users }) => {
  const [genderFilter, setGenderFilter] = useState<"All" | "Male" | "Female">("All");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredUsers = users
    .filter((u) => genderFilter === "All" || u.gender === genderFilter)
    .filter((u) => statusFilter === "All" || u.status === statusFilter)
    .sort((a, b) => (sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)));

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,FullName,Email,Gender,Status"]
        .concat(
          filteredUsers.map(
            (u) => `${u.id},${u.fullName},${u.email},${u.gender},${u.status}`,
          ),
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-4">
          <div>
            <span className="mr-2 font-semibold">Filter By Gender:</span>
            <label className="mr-2">
              <input
                type="radio"
                name="gender"
                value="All"
                checked={genderFilter === "All"}
                onChange={() => setGenderFilter("All")}
              />{" "}
              All
            </label>
            <label className="mr-2">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={genderFilter === "Male"}
                onChange={() => setGenderFilter("Male")}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={genderFilter === "Female"}
                onChange={() => setGenderFilter("Female")}
              />{" "}
              Female
            </label>
          </div>

          <div>
            <span className="mr-2 font-semibold">Filter By Status:</span>
            <label className="mr-2">
              <input
                type="radio"
                name="status"
                value="All"
                checked={statusFilter === "All"}
                onChange={() => setStatusFilter("All")}
              />{" "}
              All
            </label>
            <label className="mr-2">
              <input
                type="radio"
                name="status"
                value="Active"
                checked={statusFilter === "Active"}
                onChange={() => setStatusFilter("Active")}
              />{" "}
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={statusFilter === "Inactive"}
                onChange={() => setStatusFilter("Inactive")}
              />{" "}
              Inactive
            </label>
          </div>
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={exportCSV}
        >
          Export To CSV
        </button>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => setSortAsc(!sortAsc)}
            >
              ID {sortAsc ? "▲" : "▼"}
            </th>
            <th className="px-4 py-2">FullName</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.fullName}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.gender}</td>
              <td className="px-4 py-2">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
