/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeContextProvider({ children }) {
    const [isDark, setIsDark] = useState(
        localStorage.getItem("darkMode") === "true"
      );

      useEffect(() => {
        localStorage.setItem("darkMode", isDark.toString());
        
        if (isDark) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
        }
      }, [isDark]);

      const toggleTheme = () => {
        setIsDark(prevIsDark => !prevIsDark);
      };

      const themeContextValue = {
        isDark,
        toggleTheme
      }

    return(
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    )
}