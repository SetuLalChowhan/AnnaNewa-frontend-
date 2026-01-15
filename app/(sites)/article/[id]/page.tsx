"use client";

import ArticleCard from "@/components/card/ArticleCard";
import { Title18, Title36 } from "@/components/common/Title";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import useClient from "@/hooks/useClient";
import { Article } from "@/types/Article";

import ArticleSkeleton from "@/components/skeleton/ArticleSkeleton";

const Page = () => {
  const params = useParams();
  const slug = params?.id;

  const { data: articleData, isLoading: isArticleLoading } = useClient({
    queryKey: ["article", slug as string],
    url: `/article/${slug}`,
    enabled: !!slug,
  });

  const { data: moreArticlesData, isLoading: isMoreLoading } = useClient({
    queryKey: ["articles", "more"],
    url: "/article",
    params: { limit: 5 }, // Fetch 5 to ensure we have 4 after filtering current
  });

  const article = articleData?.article;
  const moreArticles = (moreArticlesData?.articles || [])
    .filter((item: Article) => item.slug !== slug)
    .slice(0, 4);

  if (isArticleLoading) {
    return (
      <div className="section-padding-x section-padding-y flex flex-col gap-14 animate-pulse">
        {/* Banner Skeleton */}
        <div className="w-full h-[600px] bg-gray-200 rounded-xl" />

        {/* Meta Skeleton */}
        <div className="flex gap-4">
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="h-6 w-32 bg-gray-200 rounded" />
        </div>

        {/* Content Skeleton */}
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="lg:w-[70%] w-full flex flex-col gap-8">
            <div className="h-12 w-3/4 bg-gray-200 rounded" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="lg:w-[30%] w-full space-y-5">
            <div className="aspect-4/3 w-full bg-gray-200 rounded-lg" />
            <div className="aspect-4/3 w-full bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="section-padding-x section-padding-y flex justify-center items-center min-h-[60vh]">
        <Title36>Article not found</Title36>
      </div>
    );
  }

  const readableDate = new Date(article.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="section-padding-x section-padding-y flex flex-col gap-14">
      {/* Banner */}
      <div className="relative w-full rounded-xl h-[600px] overflow-hidden">
        <Image
          src={article.cover_image?.url || "/images/placeholder.png"}
          alt={article.title}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* Author + Date */}
      <div className="flex items-center gap-3">
        <Title18 className="font-normal">By Admin</Title18>
        <Title18 className="font-normal text-primaryColor">
          {readableDate}
        </Title18>
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Left Column */}
        <div className="lg:w-[70%] w-full flex flex-col gap-8">
          <Title36>{article.title}</Title36>

          <div className="font-normal text-justify leading-relaxed whitespace-pre-wrap text-lg">
            {article.description}
          </div>
        </div>

        {/* Right Column - Images */}
        <div className="lg:w-[30%] w-full grid grid-cols-1 gap-5 items-start">
          {article.images.map((image: any, index: number) => (
            <div
              key={index}
              className="relative w-full rounded-lg overflow-hidden aspect-4/3"
            >
              <Image
                src={image.url || "/images/placeholder.png"}
                alt={`article-image-${index}`}
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
          {isMoreLoading
            ? [...Array(4)].map((_, index) => <ArticleSkeleton key={index} />)
            : moreArticles.map((item: Article) => (
                <ArticleCard key={item._id} article={item} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
