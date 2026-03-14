import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setThemeState] = useState<"light" | "dark">("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

        if (savedTheme) {
            setThemeState(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const initialTheme = prefersDark ? "dark" : "light";
            setThemeState(initialTheme);
            document.documentElement.classList.toggle("dark", initialTheme === "dark");
        }
    }, []);

    const setTheme = (newTheme: "light" | "dark") => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return { theme, setTheme };
}