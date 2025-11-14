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
      className={`${className} px-6 py-2.5 rounded-full text-white bg-primaryColor hover:from-green-700 hover:to-green-600 transition font-medium text-sm `}
    >
      {text}
    </Link>
  );
};

export default PrimaryBtn;
