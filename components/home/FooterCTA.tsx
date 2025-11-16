import Link from "next/link";
import React from "react";

const FooterCTA = () => {
  return (
    <div className="w-full bg-primaryColor/10  section-padding-x py-12 marginTop">
      <div className="max-w-4xl mx-auto text-center">

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Join AanaNewa & Start Your Journey
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Become part of a fair and transparent marketplace. Sign up today as a seller or a buyer.
        </p>

        {/* CTA Button */}
        <div className="mt-7">
          <Link
            href="/register"
            className="px-8 py-3 bg-primaryColor text-white rounded-lg text-sm sm:text-base font-medium hover:bg-primaryColor/90 transition shadow"
          >
            Join as a Seller or Buyer
          </Link>
        </div>

      </div>
    </div>
  );
};

export default FooterCTA;
