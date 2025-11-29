"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaReact } from "react-icons/fa6";

export interface SubLink {
  id: number;
  path: string;
  text: string;
}

export interface SidebarItem {
  id: number;
  text: string;
  path?: string;
  activePaths?: string[] | string;
  icon?: React.ReactNode;
  sublink?: SubLink[];
}

interface DashboardSidebarProps {
  sidebar: SidebarItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
  currentPath: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  sidebar,
  open,
  setOpen,
  currentPath,
}) => {
  const [activeParentIndex, setActiveParentIndex] = useState<number | null>(null);

  useEffect(() => {
    sidebar.forEach((item, index) => {
      if (item.sublink && item.sublink.length > 0) {
        const activeSub = item.sublink.find((sub) => sub.path === currentPath);
        if (activeSub) setActiveParentIndex(index);
      } else if (item.path === currentPath) {
        setActiveParentIndex(null);
      }
    });
  }, [currentPath, sidebar]);

  const isActive = (paths?: string[] | string) => {
    if (!paths) return false;
    const pathArray = Array.isArray(paths) ? paths : [paths];
    return pathArray.includes(currentPath);
  };

  const toggleSubmenu = (index: number) =>
    setActiveParentIndex((prev) => (prev === index ? null : index));

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 z-40 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`h-full py-8 fixed xl:static flex flex-col gap-8 px-6 w-72 transition-all duration-300 rounded-r-3xl shadow-2xl ${
          open
            ? "left-0 top-0 z-50 bg-white overflow-y-auto border-r border-gray-200"
            : "-left-full"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-primaryColor whitespace-nowrap py-3 px-4 hover:opacity-80 transition-opacity duration-200 group"
        >
          <div className="p-2 bg-primaryColor rounded-lg group-hover:shadow-lg group-hover:shadow-primaryColor/40 transition-all duration-200">
            <FaReact className="text-white text-lg" />
          </div>
          Anna Newa
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1 relative">
          {sidebar.map((item, index) => {
            const parentActive =
              item.sublink && item.sublink.length > 0
                ? item.sublink.some((sub) => isActive(sub.path))
                : isActive(item.activePaths);

            // Simple link
            if (!item.sublink || item.sublink.length === 0) {
              return (
                <Link
                  key={item.id}
                  href={item.path || "/"}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden ${
                    isActive(item.activePaths)
                      ? "bg-primaryColor text-white shadow-lg shadow-primaryColor/30"
                      : "text-gray-700 hover:text-primaryColor hover:bg-gray-100"
                  }`}
                >
                  {!isActive(item.activePaths) && (
                    <div className="absolute inset-0 bg-primaryColor opacity-0 group-hover:opacity-5 transition-opacity duration-200" />
                  )}
                  {item.icon && (
                    <span className={`text-base ${isActive(item.activePaths) ? "text-white" : "text-gray-600 group-hover:text-primaryColor"}`}>
                      {item.icon}
                    </span>
                  )}
                  <span className="relative z-10">{item.text}</span>
                </Link>
              );
            }

            // Parent with sublinks
            return (
              <div className="relative" key={item.id}>
                <div
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer w-full rounded-lg transition-all duration-200 group relative overflow-hidden ${
                    parentActive
                      ? "bg-primaryColor text-white shadow-lg shadow-primaryColor/30"
                      : "text-gray-700 hover:text-primaryColor hover:bg-gray-100"
                  }`}
                  onClick={() => toggleSubmenu(index)}
                >
                  {!parentActive && (
                    <div className="absolute inset-0 bg-primaryColor opacity-0 group-hover:opacity-5 transition-opacity duration-200" />
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    {item.icon && (
                      <span className={`text-base ${parentActive ? "text-white" : "text-gray-600 group-hover:text-primaryColor"}`}>
                        {item.icon}
                      </span>
                    )}
                    <span className="font-medium text-sm">{item.text}</span>
                  </div>
                  <MdKeyboardArrowDown
                    size={20}
                    className={`transform transition-transform duration-300 relative z-10 ${
                      activeParentIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>

                {/* Sublinks */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeParentIndex === index ? "max-h-96 mt-2" : "max-h-0"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    {item.sublink.map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.path}
                        onClick={() => setOpen(false)}
                        className={`block px-6 py-2.5 rounded-md transition-all duration-200 text-sm font-medium relative group ${
                          isActive(sub.path)
                            ? "bg-primaryColor/10 text-primaryColor border border-primaryColor/30"
                            : "text-gray-600 hover:text-primaryColor hover:bg-gray-100 border border-transparent hover:border-gray-200"
                        }`}
                      >
                        {isActive(sub.path) && (
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primaryColor rounded-r-full" />
                        )}
                        <span className="relative z-10">{sub.text}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Logout */}
          <div className="absolute bottom-8 left-6 right-6">
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 font-medium transition-all duration-200 hover:bg-gray-100 hover:text-secondaryColor group">
              <IoLogOutOutline className="text-lg group-hover:scale-110 transition-transform duration-200" />
              <span>Log Out</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default DashboardSidebar;