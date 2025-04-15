/* eslint-disable react/prop-types */
import { useState } from "react";
import { SearchContext } from "./SearchContext";

export const SearchContextProvider = ({ children }) => {
  const [searchContextResults, setSearchContextResults] = useState(null);
  const [searchParams, setSearchParams] = useState({ title: "", location: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTotalPage, setSearchTotalPage] = useState(1);
 

  const resetContextSearch = () => {
    setSearchParams({ title: "", location: "", type: "" });
    setSearchContextResults(null);
    setCurrentPage(1);
    setSearchTotalPage(1);

  };

  const searchContextData = {
    title: "",
    location: "",
    type: "",
    searchContextResults,
    setSearchContextResults,
    resetContextSearch,
    currentPage,
    setCurrentPage,
    searchParams,
    setSearchParams,
    searchTotalPage,
    setSearchTotalPage,
  };

  return (
    <SearchContext.Provider value={searchContextData}>
      {children}
    </SearchContext.Provider>
  );
};
