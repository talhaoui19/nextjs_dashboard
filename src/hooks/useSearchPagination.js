"use client";

import { useEffect, useMemo, useState } from "react";

export default function useSearchPagination({
  items,
  searchQuery = "",
  searchFn,
  itemsPerPage = 10,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase().trim();

    return items.filter((item) => searchFn(item, query));
  }, [items, searchQuery, searchFn]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return {
    currentItems,
    filteredItems,
    currentPage,
    setCurrentPage,
    totalPages,
  };
}
