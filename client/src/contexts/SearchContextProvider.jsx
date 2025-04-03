/* eslint-disable react/prop-types */
import { useState } from "react";
import { SearchContext } from "./SearchContext";

export const SearchContextProvider = ({ children }) => {
  const [searchContextResults, setSearchContextResults] = useState(null);

  const resetContextSearch = () => {
    setSearchContextResults(null);
  };

  const searchContextData = {
    title: "",
    location: "",
    type: "",
    searchContextResults,
    setSearchContextResults,
    resetContextSearch,
  };

  return (
    <SearchContext.Provider value={searchContextData}>
      {children}
    </SearchContext.Provider>
  );
};
