
import SunIcon from "./icons/Sun";
import MoonIcon from "./icons/Moon";
import { useEffect, useState } from "react";

type THEMES = "light" | "dark"

export function ThemeToggle () {
  const [theme, setTheme] = useState<THEMES | null>("dark");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("theme") as THEMES | null;
      setTheme(storedTheme || "dark");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && theme) {
      localStorage.setItem("theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);


  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="relative ml-10 mr-1">
      <button
        onClick={toggleTheme}
        id="theme-toggle-btn"
        className="appearance-none border-none flex hover:scale-125 transition"
      >
        <span className="sr-only">Elige el tema</span>
        {theme === "light" ? (
          <SunIcon className="theme-toggle-icon size-5 transition-all" />
        ) : (
          <MoonIcon className="theme-toggle-icon size-5 transition-all" />
        )}
      </button>
    </div>

  )
}
