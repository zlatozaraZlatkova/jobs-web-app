/* eslint-disable no-unused-vars */
import { createContext } from "react";

export const ThemeContext = createContext({
    isDark: false,
    toggleTheme: () => {}
})