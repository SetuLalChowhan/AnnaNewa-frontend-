import React from "react";
import { FaExclamationTriangle, FaLightbulb, FaSeedling } from "react-icons/fa";

const OurStoryMission = () => {
  return (
    <section className="section-padding-x section-padding-y  bg-linear-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Our Story & Mission
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Building a transparent and fair agricultural ecosystem—one connection at a time.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

          {/* Problem Card */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-red-100 text-red-600 rounded-full">
                <FaExclamationTriangle size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              The Problem
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Farmers receive only 
              <span className="font-bold text-primaryColor"> 20–30% </span> 
              of the consumer price due to long chains of middlemen.
            </p>
          </div>

          {/* Solution Card */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full">
                <FaLightbulb size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Our Solution
            </h3>
            <p className="text-gray-700 leading-relaxed">
              A direct <span className="font-bold">farmer-to-consumer</span> 
              platform with a transparent bidding system, ensuring fair value 
              for both sides.
            </p>
          </div>

          {/* Mission Card */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                <FaSeedling size={28} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To empower farmers with fair pricing and give consumers 
              access to fresh, affordable produce—building a sustainable 
              agricultural future.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStoryMission;
