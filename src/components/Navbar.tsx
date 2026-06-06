import { useState } from "react";
import {
  FaBars,
  FaShoppingCart,
  FaBell,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import { useContextStore } from "../contextStore/store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {search, setSearch} = useContextStore();

  return (
    <nav className="bg-slate-700 text-white shadow-md">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left Section */}
          <div className="flex items-center">
            <button
              className="text-xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaBars />
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="relative w-full max-w-lg">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-9 pl-10 pr-4 rounded-md text-black bg-white outline-none"
                onChange={(e) => {setSearch(e.target.value)}}
                value={search}
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5 text-lg">
            <button>
              <FaShoppingCart />
            </button>

            <button>
              <FaBell />
            </button>

            <button>
              <FaUser />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-9 pl-10 pr-4 rounded-md text-black bg-white outline-none"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;