"use client";

import React from "react";
import { Title36 } from "../common/Title";
import PrimaryBtn from "../common/PrimaryBtn";
import ArticleCard from "../card/ArticleCard";
import useClient from "@/hooks/useClient";
import { Article } from "@/types/Article";

import ArticleSkeleton from "../skeleton/ArticleSkeleton";

const ArticleSection = () => {
  const { data, isLoading } = useClient({
    queryKey: ["articles", "home"],
    url: "/article",
    params: { limit: 4 },
  });

  const articles = data?.articles || [];

  return (
    <div className="section-padding-x section-padding-y">
      <div className=" flex w-full gap-6 justify-between items-center">
        <Title36>Articles</Title36>
        <PrimaryBtn text="View All" href="/articles" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {isLoading
          ? [...Array(4)].map((_, index) => <ArticleSkeleton key={index} />)
          : articles.map((article: Article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
      </div>
    </div>
  );
};

export default ArticleSection;
