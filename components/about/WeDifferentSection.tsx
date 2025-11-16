import React from "react";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";

const WeDifferentSection = () => {
  return (
    <section className="section-padding-x section-padding-y  ">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          How We're Different
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          See how AanaNewa changes the game compared to the traditional supply chain.
        </p>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          
          {/* Traditional Supply Chain */}
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Traditional Supply Chain
            </h3>
            <p className="text-gray-700 mb-4">
              Farmer → Wholesaler → Distributor → Retailer → Customer
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <FaTimesCircle className="text-red-500 mr-2" /> Multiple price markups
              </li>
              <li className="flex items-center text-gray-700">
                <FaTimesCircle className="text-red-500 mr-2" /> Delayed payments to farmers
              </li>
              <li className="flex items-center text-gray-700">
                <FaTimesCircle className="text-red-500 mr-2" /> Stale produce
              </li>
            </ul>
          </div>

          {/* AanaNewa Way */}
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              AanaNewa Way
            </h3>
            <p className="text-gray-700 mb-4">
              Farmer → AanaNewa Platform → Customer
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <FaCheckCircle className="text-primaryColor mr-2" /> Fair prices for farmers
              </li>
              <li className="flex items-center text-gray-700">
                <FaCheckCircle className="text-primaryColor mr-2" /> Fresh produce for customers
              </li>
              <li className="flex items-center text-gray-700">
                <FaCheckCircle className="text-primaryColor mr-2" /> Transparent bidding system
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WeDifferentSection;
