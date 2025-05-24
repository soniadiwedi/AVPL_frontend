import { NavLink } from "react-router-dom";
import {
  Boxes,
  ShoppingCart,
  Users,
  Building2,
  User,
  CircleArrowOutUpRight,
  X,
  ClipboardList,
  CalendarCheck,
  PlaneTakeoff,
  LifeBuoy,
  PackageSearch,
} from "lucide-react";
import { useAuth } from "./context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

const commonLinks = [
  {
    name: "Assets Request",
    to: "/user/assets",
    icon: <ClipboardList size={18} />, // Asset-related (like a list or request)
  },
  {
    name: "Procurement Request",
    to: "/user/procurement",
    icon: <CircleArrowOutUpRight size={18} />, // External purchase/request
  },
  {
    name: "Mark Attendance",
    to: "/user/attendance",
    icon: <CalendarCheck size={18} />, // Attendance/check-in
  },
  {
    name: "Travel Request",
    to: "/user/travel",
    icon: <PlaneTakeoff size={18} />, // Travel/flight
  },
  {
    name: "Ticket Raise",
    to: "/user/ticket",
    icon: <LifeBuoy size={18} />, // Support ticket/help
  },
];

const adminLinks = [
  {
    name: "User",
    to: "/",
    icon: <User size={18} />, // Single user
  },
  {
    name: "Vendor Manage",
    to: "/vendor",
    icon: <Users size={18} />, // Multiple users (vendors)
  },
  {
    name: "Assets Manage",
    to: "/assets",
    icon: <PackageSearch size={18} />, // Asset management/search
  },
  {
    name: "Procurement Manage",
    to: "/procurement",
    icon: <ShoppingCart size={18} />, // Procurement/shopping
  },
  {
    name: "Facility Manage",
    to: "/facility",
    icon: <Building2 size={18} />, // Facilities/infrastructure
  },
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
  <div className="flex flex-col justify-between h-full">
    <div>
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

      {/* Navigation links */}
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
    </div>

    {/* Logout button at the bottom */}
    {user && (
      <button
        onClick={logout}
        className="w-full mt-6 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    )}
  </div>
</div>

    </>
  );
};

export default Sidebar;
