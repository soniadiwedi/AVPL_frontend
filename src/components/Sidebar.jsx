import { NavLink } from "react-router-dom";
import {
  Boxes,
  ShoppingCart,
  Users,
  Building2,
  User,
  CircleArrowOutUpRight,
  X
} from "lucide-react";
import { useAuth } from "./context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const commonLinks = [
    { name: "Assets Request", to: "/user/assets", icon: <CircleArrowOutUpRight size={18} /> },
    { name: "Procurement Request", to: "/user/procurement", icon: <CircleArrowOutUpRight size={18} /> },
    { name: "Mark Attendance", to: "/user/attendance", icon: <Building2 size={18} /> },
    { name: "Mark Attendance", to: "/user/ticket", icon: <Building2 size={18} /> },
    { name: "Mark Attendance", to: "/user/travel", icon: <Building2 size={18} /> },
  ];

  const adminLinks = [
    { name: "User", to: "/", icon: <User size={18} /> },
    { name: "Vendor", to: "/vendor", icon: <Users size={18} /> },
    { name: "Assets Manage", to: "/assets", icon: <Boxes size={18} /> },
    { name: "Procurement", to: "/procurement", icon: <ShoppingCart size={18} /> },
  ];

  const links = user?.role === "admin" ? adminLinks : commonLinks;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg p-5 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:relative lg:z-auto`}
      >
        {/* Close icon on mobile */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <img src="/logo.webp" alt="logo" className="w-1/2" />
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Logo for desktop */}
        <div className="hidden lg:block mb-6">
          <img src="/logo.webp" alt="logo" className="w-1/2" />
        </div>

        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
                onClick={onClose}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {user && (
          <button
            onClick={logout}
            className="w-full mt-6 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
