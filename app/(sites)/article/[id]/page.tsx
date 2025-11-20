import ArticleCard from "@/components/card/ArticleCard";
import { Title18, Title36 } from "@/components/common/Title";
import { articleDetails, ARTICLES } from "@/utils/Data";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="section-padding-x section-padding-y flex flex-col gap-14">
      {/* Banner */}
      <div className="relative w-full rounded-xl h-[600px] overflow-hidden">
        <Image
          src={articleDetails.bannerImage || ""}
          alt="bannerArticle"
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* Author + Date */}
      <div className="flex items-center gap-3">
        <Title18 className="font-normal">By Admin</Title18>
        <Title18 className="font-normal text-primaryColor">
          {articleDetails.createdAt}
        </Title18>
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Left Column */}
        <div className="lg:w-[70%] w-full flex flex-col gap-8">
          <Title36>{articleDetails.title}</Title36>

          <Title18 className="font-normal! text-justify leading-relaxed">
            {articleDetails.description}
          </Title18>
        </div>

        {/* Right Column - Images */}
        <div className="lg:w-[30%] w-full grid grid-cols-1 gap-5 items-start">
          {articleDetails.images.map((image, index) => (
            <div
              key={index}
              className="relative w-full rounded-lg overflow-hidden aspect-4/3"
            >
              <Image
                src={image || ""}
                alt="articleImage"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* More Articles */}
      <div className="mt-14">
        <Title36>More Articles</Title36>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {ARTICLES.slice(0, 4).map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
