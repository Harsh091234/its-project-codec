import { Search } from "lucide-react";
import type { FC, ChangeEvent } from "react";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: FC<SearchBarProps> = ({ search, setSearch, onSearch }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 bg-gray-50 px-4 text-sm py-1.5 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <button
        onClick={onSearch}
        className="flex text-sm items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-5 py-2 rounded-lg font-medium transition shadow-md hover:shadow-lg"
      >
        <Search className="w-4 h-4" />
        Search
      </button>
    </div>
  );
};

export default SearchBar;
