import AboutBanner from "@/components/about/AboutBanner";
import CallToAction from "@/components/about/CallToAction";
import FutureVision from "@/components/about/FutureVision";
import OurStoryMission from "@/components/about/OurStoryMission";
import OurTeam from "@/components/about/OurTeam";
import WeDifferentSection from "@/components/about/WeDifferentSection";
import FooterCTA from "@/components/home/FooterCTA";
import React from "react";

const page = () => {
  return (
    <div>
      <AboutBanner />
      <OurStoryMission />
      <WeDifferentSection />
      <OurTeam />
      <FutureVision />
        <FooterCTA/>
    </div>
  );
};

export default page;
