import CommonBanner from "@/components/common/CommonBanner";
import React from "react";
import ArticleBanner from "@/assets/images/articleImage.jpg";
import ArticleSection from "@/components/home/ArticleSection";
import AllArticleSection from "@/components/articles/AllArticleSection";

const page = () => {
  return (
    <div>
      {/* <CommonBanner
        bannerImage={ArticleBanner}
        title={`Latest Agriculture Articles, Farming Tips, and Market Trends`}
        description={`Read in-depth articles on farming techniques, fair pricing, agricultural technology, rural development, and direct farmer-to-consumer marketplaces. Stay ahead with actionable insights and industry-leading updates.`}
      /> */}

      <AllArticleSection />
    </div>
  );
};

export default page;
