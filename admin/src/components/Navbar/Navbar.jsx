import React, { useContext } from "react";
import {
  Bell,
  Search,
  Menu,
  LogOut,
  UserCircle,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { token } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={22} />
          </button> */}

          <div>
            <h1 className="text-xl font-bold text-red-600">
              Gollya Avanta
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* Search
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80">
          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent ml-2 outline-none w-full text-sm"
          />
        </div> */}

        {/* Right */}
        {token && (
          <div className="flex items-center gap-3">
            {/* <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell
                size={22}
                className="text-gray-600"
              />

              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
            </button> */}

            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-semibold">
                Admin
              </span>

              <span className="text-xs text-gray-500">
                Administrator
              </span>
            </div>

            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <UserCircle
                size={30}
                className="text-slate-600"
              />
            </div>

       
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;