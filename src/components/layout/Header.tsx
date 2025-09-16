import { Bell, Menu, User } from "lucide-react";
import React from 'react';

interface HeaderProps {
    onMobileToggle: () => void;
    title?: string;
}

const Header: React.FC<HeaderProps> = ({
    onMobileToggle,
    title = "Dashboard"
}) => {
    return (
        <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <button
                    className="md:hidden"
                    onClick={onMobileToggle}
                >
                    <Menu size={24} />
                </button>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>

            <div className="flex items-center gap-4">
                <Bell className="cursor-pointer" />
                <User className="cursor-pointer" />
            </div>
        </header>
    );
};

export default Header;
