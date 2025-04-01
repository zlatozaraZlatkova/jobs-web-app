import { createContext } from "react";

export const SearchContext = createContext({
    title: "",
    location: "",
    type: ""
});
