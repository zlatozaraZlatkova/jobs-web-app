/* eslint-disable no-unused-vars */
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { createPageURLParams } from "../utils/createPageURLParams";

export function usePaginationWithURL() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const urlPageNumber = parseInt(searchParams.get("page") || "1");
  const technologyFilter = searchParams.get("technology");


  const setUrlPageNumber = useCallback(
    (newPage) => {
      const newParams = createPageURLParams(newPage, searchParams);
      //console.log("URL page changed to:", newParams);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  return {
    urlPageNumber,
    setUrlPageNumber,
    technologyFilter,
  };
}
