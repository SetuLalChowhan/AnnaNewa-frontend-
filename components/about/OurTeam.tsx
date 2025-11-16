import React from "react";
import Image from "next/image";
import Member1 from "@/assets/images/t1.jpg";
import Member2 from "@/assets/images/t2.jpg";
import Member3 from "@/assets/images/t5.jpg";
import Member4 from "@/assets/images/t4.jpg";

// Updated team data
const teamMembers = [
  {
    name: "Amit Gosh",
    role: "Chief Innovation Strategist",
    image: Member1,
  },
  {
    name: "Sourav Mondal",
    role: "Senior Agricultural Consultant",
    image: Member2,
  },
  {
    name: "Setu Chowhan",
    role: "Lead Technology Developer",
    image: Member3,
  },
  {
    name: "Robi Mankhin",
    role: "Campaign & Analytics Director",
    image: Member4,
  },
];


const OurTeam = () => {
  return (
    <section className="section-padding-x section-padding-y bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          The Team
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Agriculture experts + Technology specialists
        </p>
        <blockquote className="mt-4 italic text-gray-700 max-w-xl mx-auto">
          "We understand both farming challenges and digital solutions"
        </blockquote>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              {/* Fixed-size Image */}
              <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-primaryColor shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
