import React from "react";
import Link from "next/link";

const ctaItems = [
  {
    title: "Ready to get the true value of your hard work?",
    buttonText: "Join as Farmer",
    buttonLink: "/register/farmer",
    bgColor: "bg-primaryColor text-white hover:bg-green-700",
  },
  {
    title: "Want fresh produce at fair prices?",
    buttonText: "Shop Fresh Produce",
    buttonLink: "/products",
    bgColor: "bg-white text-gray-800 hover:bg-gray-200 border border-gray-300",
  },
];

const CallToAction = () => {
  return (
    <section className="section-padding-x section-padding-y  bg-green-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Make a Difference Today
        </h2>
        <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
          Join our platform to empower farmers and enjoy fresh, fair-priced produce. 
          Together, we create a win-win for everyone.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ctaItems.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {item.title}
              </h3>
              <Link
                href={item.buttonLink}
                className={`px-6 py-3 rounded-lg font-medium shadow-md transition ${item.bgColor}`}
              >
                {item.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
