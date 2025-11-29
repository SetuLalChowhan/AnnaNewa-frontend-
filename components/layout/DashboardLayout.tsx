"use client";

import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import DashboardNavbar from "@/shared/DashboardNavbar";
import DashboardSidebar, { SidebarItem } from "@/shared/DashboardSiderbar";
import { usePathname } from "next/navigation"; // <- Import hook

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // <- Get current path

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]); // <- run on route change

  const sideBar: SidebarItem[] = [
    {
      id: 1,
      icon: <MdDashboard />,
      text: "Dashboard",
      path: "/dashboard",
      activePaths: ["/dashboard"],
    },
    {
      id: 2,
      icon: <MdDashboard />,
      text: "Create Product",
      path: "/create-product",
      activePaths: ["/create-product"],
    },
    // {
    //   id: 2,
    //   icon: <MdDashboard />,
    //   text: "Admin Management",
    //   path: "/dashboard/admin-list",
    //   sublink: [
    //     { id: 1, text: "Admin List", path: "/dashboard/admin-list" },
    //     { id: 2, text: "Add New Admin", path: "/dashboard/add-admin" },
    //   ],
    // },
  ];

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <DashboardSidebar
        sidebar={sideBar}
        open={open}
        setOpen={setOpen}
        currentPath={pathname} // <- pass pathname here
      />

      {/* Main Content */}
      <div className="flex-1 bg-dark text-white flex flex-col overflow-auto custom-scrollbar">
        {/* Navbar */}
        <div className="flex flex-col lg:gap-10 gap-5 lg:py-6 py-3 lg:px-[30px] px-2.5 sm:px-5">
          <DashboardNavbar open={open} setOpen={setOpen} />

          {/* Page content */}
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
