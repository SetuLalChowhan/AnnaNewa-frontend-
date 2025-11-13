import React from "react";
import Link from "next/link";

interface BtnProps {
  text: string;
  href: string;
  className?: string;
}

const PrimaryBtn = ({ text, href, className }: BtnProps) => {
  return (
    <Link
      href={href}
      className={`${className} px-6 py-2 rounded-full text-white bg-linear-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition font-medium text-sm `}
    >
      {text}
    </Link>
  );
};

export default PrimaryBtn;
