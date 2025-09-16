import { useAuth } from "@/contexts/AuthContext";
import {
    BarChart2,
    Building2,
    Cpu,
    DollarSign,
    FileText,
    Home,
    Mail,
    Menu,
    MessageCircle,
    Phone,
    Users,
    Wrench,
    X
} from "lucide-react";
import React from 'react';

interface SidebarProps {
    collapsed: boolean;
    mobileOpen: boolean;
    onToggle: () => void;
    onMobileToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    collapsed,
    mobileOpen,
    onToggle,
    onMobileToggle
}) => {
    const { user, logout } = useAuth();

    const menuItems = [
        { name: "Dashboard", icon: <Home size={16} /> },
        { name: "Properties", icon: <Building2 size={16} /> },
        { name: "Tenants", icon: <Users size={16} /> },
        { name: "Rent Collection", icon: <DollarSign size={16} /> },
        { name: "Maintenance", icon: <Wrench size={16} /> },
        { name: "Financials & Investor", icon: <BarChart2 size={16} /> },
        { name: "Stripe Connect", icon: <DollarSign size={16} /> },
        { name: "Email Intelligence", icon: <Mail size={16} /> },
        { name: "Rent Evaluation", icon: <FileText size={16} /> },
        { name: "Predictive Maintenance", icon: <Cpu size={16} /> },
        { name: "Smart Documents", icon: <FileText size={16} /> },
        { name: "Tenant Chatbot", icon: <MessageCircle size={16} /> },
        { name: "Communication", icon: <Phone size={16} /> },
    ];

    return (
        <div
            className={`bg-slate-900 text-white transition-all duration-300 fixed md:relative z-40 h-full ${collapsed ? "w-12" : "w-60"
                } ${mobileOpen ? "left-0" : "-left-60"} md:left-0`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                {!collapsed && <h1 className="text-xs font-bold">Admin</h1>}
                <button
                    className="cursor-pointer"
                    onClick={() =>
                        window.innerWidth < 768 ? onMobileToggle() : onToggle()
                    }
                >
                    {window.innerWidth < 768 && mobileOpen ? (
                        <X size={16} />
                    ) : (
                        <Menu size={16} />
                    )}
                </button>
            </div>

            {/* Menu */}
            <ul className="mt-4 space-y-2 text-sm flex-1">
                {menuItems.map((item, idx) => (
                    <li
                        key={idx}
                        className="flex items-center gap-3 p-2 px-3 hover:bg-slate-700 rounded-md cursor-pointer text-nowrap"
                    >
                        {item.icon}
                        {!collapsed && <span>{item.name}</span>}
                    </li>
                ))}
            </ul>

            {/* User Info and Logout */}
            {!collapsed && user && (
                <div className="border-t border-slate-700 p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                                {user.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full text-left text-sm text-gray-300 hover:text-white py-2 px-3 rounded-md hover:bg-slate-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}

            {/* Collapsed user info */}
            {collapsed && user && (
                <div className="border-t border-slate-700 p-4">
                    <div className="flex justify-center mb-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full text-center text-sm text-gray-300 hover:text-white py-2 rounded-md hover:bg-slate-700 transition-colors"
                        title="Logout"
                    >
                        <X size={16} className="mx-auto" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
