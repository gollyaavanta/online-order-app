import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navItems = [
    {
      to: "/add",
      label: "Add Items",
      icon: assets.add_icon,
    },
    {
      to: "/list",
      label: "Products",
      icon: assets.order_icon,
    },
    {
      to: "/orders",
      label: "Orders",
      icon: assets.order_icon,
    },
    {
      to: "/manage-brands-categories",
      label: "Brands & Categories",
      icon: assets.order_icon,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-200 shadow-sm flex-col justify-between ">

        {/* Navigation */}
        <div className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-orange-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={`w-5 h-5 ${
                      isActive ? "brightness-0 invert" : "opacity-80"
                    }`}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={logout}
            className="w-full rounded-xl bg-red-50 border border-red-200 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-gray-200 bg-white md:hidden h-16">

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-2 ${
                isActive ? "text-orange-600" : "text-gray-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`w-5 h-5 ${
                    isActive ? "opacity-100" : "opacity-60"
                  }`}
                />
                <span className="text-[11px] mt-1 text-center">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </aside>
    </>
  );
};

export default Sidebar;