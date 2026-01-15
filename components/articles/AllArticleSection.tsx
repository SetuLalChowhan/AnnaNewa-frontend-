"use client";

import React, { useEffect, useState } from "react";
import ArticleSearchBar from "./ArticleSearchBar";
import { Title18, Title36 } from "../common/Title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useClient from "@/hooks/useClient";
import { Article } from "@/types/Article";
import ArticleCard from "../card/ArticleCard";
import Pagination from "../common/Pagination";
import ArticleSkeleton from "../skeleton/ArticleSkeleton";
import useDebounce from "@/hooks/useDebounce";

const AllArticleSection = () => {
  const [articleFilter, setArticleFilter] = useState({
    search: "",
    sort: "",
  });

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setArticleFilter((prev) => ({
      ...prev,
      search: debouncedSearch,
    }));
    setPage(1); // Reset page to 1 on new search
  }, [debouncedSearch]);

  const { data, isLoading } = useClient({
    queryKey: ["articles", "all"],
    url: "/article",
    params: {
      search: articleFilter.search,
      sort:
        articleFilter.sort === "latest"
          ? "latest"
          : articleFilter.sort === "oldest"
          ? "oldest"
          : "",
      page,
      limit: 8,
    },
  });

  const articles = data?.articles || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div className="section-padding-x section-padding-y flex flex-col gap-10">
      <ArticleSearchBar search={search} setSearch={setSearch} />

      <div className="flex flex-col gap-10">
        <div className="flex gap-6 justify-between items-center">
          <Title36>Articles</Title36>

          <div className="w-40">
            <Select
              onValueChange={(value) =>
                setArticleFilter((prev: any) => ({
                  ...prev,
                  sort: value,
                }))
              }
            >
              <SelectTrigger className="mt-2 w-full border-gray-300">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="latest">Latest Articles</SelectItem>
                <SelectItem value="oldest">Oldest Articles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? [...Array(8)].map((_, index) => <ArticleSkeleton key={index} />)
            : articles.map((article: Article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
        </div>

        {!isLoading && articles.length === 0 && (
          <div className="w-full text-center py-20">
            <Title18>No articles found</Title18>
          </div>
        )}

        {articles.length > 0 && (
          <div className="flex w-full justify-center mt-10 items-center">
            <Pagination page={page} setPage={setPage} totalPage={totalPages} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllArticleSection;
