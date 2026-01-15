import { useValueStore } from "@/providers/useState";
import React, { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

import { usePathname, useRouter } from "next/navigation";

const SearchBar = () => {
  const { filterValue, setFilterValue } = useValueStore();
  const [localSearch, setLocalSearch] = useState(filterValue.search || "");
  const debouncedSearch = useDebounce(localSearch, 500);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (debouncedSearch && pathname !== "/products") {
      router.push("/products#products-section");
    }
    setFilterValue({ search: debouncedSearch });
  }, [debouncedSearch, setFilterValue, pathname, router]);

  // Sync local state if global state changes from elsewhere (e.g. clear filters)
  useEffect(() => {
    if (filterValue.search !== localSearch) {
      setLocalSearch(filterValue.search || "");
    }
  }, [filterValue.search]);

  return (
    <div className="flex items-center text-sm gap-2 bg-gray-100 border border-gray-300 px-3 rounded-full">
      <input
        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
        type="text"
        placeholder="Search products"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M10.836 10.615 15 14.695"
          stroke="#7A7B7D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          clipRule="evenodd"
          d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
          stroke="#7A7B7D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
