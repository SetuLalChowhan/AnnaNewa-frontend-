"use client";

import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiData } from "react-icons/bi";
import DashboardNavbar from "@/shared/DashboardNavbar";
import DashboardSidebar, { SidebarItem } from "@/shared/DashboardSiderbar";
import { usePathname } from "next/navigation"; // <- Import hook
import { RiProductHuntLine } from "react-icons/ri";
import { MdBorderColor } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
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
      icon: <MdOutlineProductionQuantityLimits />,
      text: "Create Product",
      path: "/create-product",
      activePaths: ["/create-product"],
    },
    {
      id: 3,
      icon: <RiProductHuntLine />,
      text: "My Products",
      path: "/my-products",
      activePaths: ["/my-products"],
    },
    {
      id: 4,
      icon: <MdBorderColor />,
      text: "My Orders",
      path: "/my-orders",
      activePaths: ["/my-orders"],
    },
    {
      id: 5,
      icon: <BiData />,
      text: "Bid History",
      path: "/bid-history",
      activePaths: ["/bid-history"],
    },
    {
      id: 6,
      icon: <CiSettings />,
      text: "Setting",
      path: "/setting",
      activePaths: ["/setting"],
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
