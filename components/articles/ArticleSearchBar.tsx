import React from "react";
import { GoSearch } from "react-icons/go";

interface Props {
  search: string;
  setSearch: Function;
  setArticleFilter: Function;
}

const ArticleSearchBar = ({ search, setSearch, setArticleFilter }: Props) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // update parent filter
    setArticleFilter((prev: any) => ({
      ...prev,
      search: value,
    }));
  };

  return (
    <div className="max-w-5xl w-full border mx-auto border-primaryColor shadow-lg rounded-lg px-4 py-3 flex gap-3 items-center">
      <span>
        <GoSearch className="text-primaryColor text-2xl" />
      </span>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className="w-full bg-transparent outline-none border-none text-secondaryColor font-medium"
      />
    </div>
  );
};

export default ArticleSearchBar;
