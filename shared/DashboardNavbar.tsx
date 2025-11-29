"use client";

import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { usePathname } from "next/navigation";

interface DashboardNavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ open, setOpen }) => {
  return (
    <div className="flex items-center justify-between w-full py-3 md:py-6 px-0 rounded-2xl">
      <div className="flex items-center gap-4">
        {/* Hamburger for mobile */}
        <span
          onClick={() => setOpen(!open)}
          className="xl:hidden block cursor-pointer"
        >
          <GiHamburgerMenu color="black" size={26} />
        </span>

        {/* Page title */}
        <div className="flex items-center gap-4">
          <p className="text-black text-3xl font-bold">Dashboard</p>
        </div>
      </div>

      {/* Right-side icons */}
      <div className="flex items-center gap-4">
        <IoIosNotifications size={24} className="cursor-pointer" />
        <CgProfile size={24} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default DashboardNavbar;
