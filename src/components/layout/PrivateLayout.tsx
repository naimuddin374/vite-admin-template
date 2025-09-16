import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function PrivateLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={handleToggle}
        onMobileToggle={handleMobileToggle}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header
          onMobileToggle={handleMobileToggle}
          title="Dashboard"
        />

        {/* Content */}
        <Outlet />
      </div>
    </div>
  );
}
