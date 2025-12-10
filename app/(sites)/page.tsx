import AsyncWrapper from "@/components/common/AsyncWrapper";
import { Title36 } from "@/components/common/Title";
import ArticleSection from "@/components/home/ArticleSection";
import FooterCTA from "@/components/home/FooterCTA";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ProductForBuy from "@/components/home/ProductForBuy";
import ProductForSell from "@/components/home/ProductForSell";
import Testimonial from "@/components/home/Testimonial";
import WhyGoDirectSection from "@/components/home/WhyGoDirectSection";

const page = () => {
  return (
    <div>
      <HeroSection />
      <ProductForSell />
      <ProductForBuy />
      <HowItWorksSection />
      <WhyGoDirectSection />
      <ArticleSection />
      <div className=" flex flex-col ">
        <Title36 className="text-center text-gray-900 ">
          What Our Customers Say
        </Title36>
        <Testimonial />
        <FooterCTA />
      </div>
    </div>
  );
};

export default page;
