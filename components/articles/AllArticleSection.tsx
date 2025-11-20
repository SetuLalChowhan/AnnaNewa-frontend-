"use client";

import React, { useEffect, useState } from "react";
import ArticleSearchBar from "./ArticleSearchBar";
import { Title36 } from "../common/Title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ARTICLES } from "@/utils/Data";
import ArticleCard from "../card/ArticleCard";
import Pagination from "../common/Pagination";

const AllArticleSection = () => {
  const [articleFilter, setArticleFilter] = useState({
    search: "",
    sort: "",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 🔥 Console logs whenever filter changes

  return (
    <div className="section-padding-x section-padding-y flex flex-col gap-10">
      <ArticleSearchBar
        search={search}
        setSearch={setSearch}
        setArticleFilter={setArticleFilter}
      />

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
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="latest">Latest Articles</SelectItem>
                <SelectItem value="oldest">Oldest Articles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ARTICLES.slice(0, 4).map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>

        <div className="flex w-full justify-center mt-10 items-center">
          <Pagination page={page} setPage={setPage} totalPage={10} />
        </div>
      </div>
    </div>
  );
};

export default AllArticleSection;
