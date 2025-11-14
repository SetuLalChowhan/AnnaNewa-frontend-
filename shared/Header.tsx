"use client";

import PrimaryBtn from "@/components/common/PrimaryBtn";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ArrowIcon } from "@/components/icons/CustomIcons";
import SearchBar from "@/components/common/SearchBar";
import Hamburger from "hamburger-react";
import MobileBar from "./MobileBar";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  return (
    <nav
      className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 py-4 
      border-b border-gray-200 bg-white text-gray-800 relative shadow-sm"
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-xl sm:text-2xl font-semibold text-primaryColor whitespace-nowrap"
      >
        Anna Newa
      </Link>

      {/* Middle Section */}
      <div className="flex-1 flex justify-center px-4 xlg:px-10">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <SearchBar />
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden xmd:flex items-center gap-4 xlg:gap-10 whitespace-nowrap">
        <Link href="/" className="hover:text-green-600 transition">
          Home
        </Link>
        <Link href="/about" className="hover:text-green-600 transition">
          About
        </Link>

        {/* Products Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setProductOpen(true)}
          onMouseLeave={() => setProductOpen(false)}
        >
          <DropdownMenu open={productOpen} onOpenChange={setProductOpen}>
            <DropdownMenuTrigger
              className="flex items-center gap-1 cursor-pointer hover:text-green-600 transition
              focus:outline-none focus:ring-0 focus-visible:ring-0"
            >
              Products
              <ArrowIcon
                className={`w-4 h-4 transition-transform duration-300 ${
                  productOpen ? "rotate-180" : ""
                }`}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-44 mt-2 origin-top transition-all duration-300 
              data-[state=open]:opacity-100 data-[state=open]:translate-y-0 
              data-[state=closed]:opacity-0 data-[state=closed]:-translate-y-2"
            >
              <DropdownMenuItem>
                <Link href="/sell-products" className="w-full">
                  Sell Products
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/buy-products" className="w-full">
                  Buy Products
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link href="/articles" className="hover:text-green-600 transition">
          Articles
        </Link>

        <Link href="/chat" className="hover:text-green-600 transition">
          Chat
        </Link>

        <Link href="/contact" className="hover:text-green-600 transition">
          Contact
        </Link>

        <div className="hidden md:block">
          <PrimaryBtn text="Login" href="/login" />
        </div>
      </div>

      {/* Hamburger Icon */}
      <button aria-label="Menu" className="xmd:hidden text-green-600 ml-2">
        <Hamburger size={22} toggled={isOpen} toggle={setOpen} />
      </button>

      {/* Mobile Menu */}
      <MobileBar isOpen={isOpen} />
    </nav>
  );
};

export default Header;
