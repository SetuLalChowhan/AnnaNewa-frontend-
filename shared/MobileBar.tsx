import PrimaryBtn from "@/components/common/PrimaryBtn";
import Link from "next/link";
import React from "react";

interface Props {
  isOpen: boolean;
}

const MobileBar = ({ isOpen }: Props) => {
  return (
    <div
      className={`
          fixed left-0 w-full bg-white shadow-lg py-5 px-6 flex flex-col gap-4 z-50 border-b
          transition-all duration-500 ease-in-out
          ${
            isOpen
              ? "top-16 opacity-100 translate-y-0"
              : "top-10 opacity-0 -translate-y-10 pointer-events-none"
          }
        `}
    >
      <Link href="/" className="block">
        Home
      </Link>
      <Link href="/about" className="block">
        About
      </Link>

      {/* Mobile Dropdown */}
      <details className="w-full">
        <summary className="cursor-pointer py-2">Products</summary>
        <div className="flex flex-col gap-2 pl-4">
          <Link href="/sell-products">Sell Products</Link>
          <Link href="/buy-products">Buy Products</Link>
        </div>
      </details>

      <Link href="/articles" className="block">
        Articles
      </Link>
      <Link href="/chat" className="block">
        Chat
      </Link>
      <Link href="/contact" className="block">
        Contact
      </Link>

      <PrimaryBtn text="Login" href="/login" />
    </div>
  );
};

export default MobileBar;
