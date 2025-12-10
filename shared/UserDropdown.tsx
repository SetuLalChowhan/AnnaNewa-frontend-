"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import useMutationClient from "@/hooks/useMutationClient";

interface UserType {
  name: string;
  email: string;
  profile_pic?: string;
}

interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  href?: string; // optional, for actions like logout
  onClick?: () => void;
}

interface UserDropdownProps {
  className?: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { user, logout } = useAuth();

  

  const logoutMutation = useMutationClient({
    url: `/auth/logout`,
    method: "post",
    isPrivate: false,
    successMessage: "Logout successful!",
    redirectTo: "/login",
  });

  // Logout function example
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const items: DropdownItem[] = [
    {
      label: "Create Product",
      icon: <PlusCircle className="w-4 h-4 mr-3" />,
      href: "/create-product",
    },
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4 mr-3" />,
      href: "/dashboard",
    },
    {
      label: "Logout",
      icon: <LogOut className="w-4 h-4 mr-3" />,
      onClick: handleLogout,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUserInitial = () => user?.name.charAt(0).toUpperCase() ;
  

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-center aspect-square bg-gray-200 shadow-md w-10 h-10 rounded-full font-medium hover:opacity-90 transition-opacity"
      >
        {user?.profilePicture?.url ? (
          <img
            src={user.profilePicture.url}
            alt="avatar"
            className="rounded-full aspect-square w-10 h-10"
          />
        ) : (
          getUserInitial()
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white py-2 z-50 border border-gray-100"
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-600 truncate">{user?.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {items.map((item, index) =>
              item.href ? (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserDropdown;
