"use client";

import React from "react";
import ReactPaginate from "react-paginate";
import { FaForward, FaBackward } from "react-icons/fa";

interface PageProps {
  page: number;
  setPage: Function;
  totalPage: Number;
}

const Pagination = ({ page, setPage, totalPage }: PageProps) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<FaForward />}
      previousLabel={<FaBackward />}
      pageCount={Number(totalPage)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      onPageChange={(event) => setPage(event.selected + 1)}
      containerClassName="flex items-center md:gap-3 gap-1 flex-wrap"
      previousClassName="w-[42px] cursor-pointer h-[42px] bg-[var(--color-secondaryColor)/10] flex justify-center items-center text-[var(--color-secondaryColor)] rounded-full"
      nextClassName="w-[42px] cursor-pointer h-[42px] bg-[var(--color-secondaryColor)/10] flex justify-center items-center text-[var(--color-secondaryColor)] rounded-full"
      activeLinkClassName="font-[700] bg-[var(--color-primaryColor)] cursor-pointer rounded-full !text-white border-none"
      disabledClassName="bg-none cursor-not-allowed opacity-50"
      breakClassName="md:px-4 px-2 py-2 text-sm font-medium text-[var(--color-secondaryColor)]"
      pageLinkClassName="w-[42px] cursor-pointer h-[42px]  flex justify-center items-center text-[var(--color-secondaryColor)] rounded-full"
      forcePage={page - 1}
    />
  );
};

export default Pagination;
