
import { Link} from "react-router-dom";




const Header = () => {


  return (
    <header className="border-b border-gray-300 bg-white px-6 py-4 flex items-center justify-between">
      {/* Title */}
      <h1 className="text-xl italic font-sans font-semibold text-gray-800">
        UserDataManipulation
      </h1>

      {/* Tabs */}
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link
          
              to={"/"}
              className="text-gray-700 cursor-pointer font-medium hover:text-blue-500 transition"
            >
              Home
            </Link>
          </li>
        
        </ul>
      </nav>
    </header>
  );
};

export default Header;
