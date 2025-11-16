import Link from "next/link";
import React from "react";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Products for Sell", href: "/products/sell" },
        { name: "Products for Buy", href: "/products/buy" },
        { name: "Articles", href: "/articles" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Chat with AI", href: "/chat" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms" },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { name: "Instagram", href: "https://instagram.com" },
        { name: "Facebook", href: "https://facebook.com" },
        { name: "LinkedIn", href: "https://linkedin.com" },
        { name: "YouTube", href: "https://youtube.com" },
      ],
    },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-white">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-300/40 text-gray-600">
        {/* Logo + Description */}
        <div>
          <Link
            href="/"
            className="text-xl sm:text-2xl font-semibold text-primaryColor whitespace-nowrap"
          >
            Anna Newa
          </Link>
          <p className="max-w-[410px] mt-6 text-sm leading-relaxed">
            AanaNewa connects farmers and consumers directly with a simple
            bidding system—ensuring fair prices, transparency, and a
            middleman-free marketplace powered by trust.
          </p>
        </div>

        {/* Dynamic Footer Sections */}
        <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-6">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline transition"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="hover:underline transition"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500">
        Copyright 2025 ©
        <span className="font-medium text-gray-700"> Anna Newa</span>— All
        Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
