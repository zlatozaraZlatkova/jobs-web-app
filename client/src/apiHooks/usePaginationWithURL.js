import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { createPageURLParams } from "../utils/createPageURLParams";

export function usePaginationWithURL() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(pageFromUrl || 1);

  useEffect(() => {
    if (currentPage !== pageFromUrl) {
      const newParams = createPageURLParams(currentPage, searchParams);
      setSearchParams(newParams);
    }
  }, [currentPage, pageFromUrl, searchParams, setSearchParams]);

  return {
    currentPage,
    setCurrentPage,
  };
}
