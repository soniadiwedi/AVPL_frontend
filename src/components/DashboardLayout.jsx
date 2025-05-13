import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header with menu icon */}
        <div className="lg:hidden p-4">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
        </div>

        {/* Header */}
        <Header />

        {/* Main content (scrollable) */}
        <main className="flex-1 overflow-y-auto p-4">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
