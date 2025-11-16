import Link from 'next/link';
import React from 'react'


interface BtnProps {
  text: string;
  href: string;
  className?: string;
}
const BigButton = ({ text, href, className }: BtnProps) => {
  return (
  <Link
      href={href}
      className={`${className} px-6 py-3 bg-primaryColor hover:bg-green-700 rounded-lg text-white font-medium shadow-md transition `}
    >
      {text}
    </Link>
  )
}

export default BigButton