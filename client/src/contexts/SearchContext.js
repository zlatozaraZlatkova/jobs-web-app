/* eslint-disable react/prop-types */
import { createContext } from "react";

export const SearchContext = createContext({
  title: "",
  location: "",
  type: "",
  searchContextResults: null,
  setSearchContextResults: () => {},
  resetContextSearch: () => {},
});
