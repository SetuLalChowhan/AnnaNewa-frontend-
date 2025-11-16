import React from "react";
import { FaSeedling, FaMobileAlt, FaGlobe, FaRobot } from "react-icons/fa";

const visionPoints = [
  {
    title: "Regional Expansion",
    description: "Expanding to X more regions",
    icon: <FaGlobe size={28} />,
  },
  {
    title: "More Crop Categories",
    description: "Adding more crop categories for farmers and buyers",
    icon: <FaSeedling size={28} />,
  },
  {
    title: "Mobile App Development",
    description: "Creating mobile apps for easy access and tracking",
    icon: <FaMobileAlt size={28} />,
  },
  {
    title: "AI-Powered Insights",
    description: "Providing AI-powered farming insights for better decisions",
    icon: <FaRobot size={28} />,
  },
];

const FutureVision = () => {
  return (
    <section className="section-padding-x section-padding-y ">
      <div className="max-w-6xl mx-auto text-center">

        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Our Future Vision
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          What we aim to achieve in the coming years for farmers and consumers.
        </p>

        {/* Vision Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {visionPoints.map((point, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-4 text-primaryColor">
                {point.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h3>
              <p className="text-gray-700">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureVision;
