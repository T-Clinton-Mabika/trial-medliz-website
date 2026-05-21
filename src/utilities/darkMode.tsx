/*
 * =========================== DARK MODE CONTEXT ===========================
 * - Provides dark mode state and toggle functionality throughout the app
 * - Persists user's theme preference in localStorage
 * - Respects system preference on initial load
 * - Listens for system preference changes when user hasn't explicitly chosen
 */

import React, { useEffect, useState, createContext, useContext } from "react";

interface DarkModeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

const THEME_STORAGE_KEY = "theme";
const DarkModeContext = createContext<DarkModeToggleProps | undefined>(
  undefined,
);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggle = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(THEME_STORAGE_KEY, "light");
    }
  };

  // Initialize theme on mount: check localStorage first, then system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldBeDark = storedTheme === "dark" || (!storedTheme && systemDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
    setIsLoading(false);
  }, []);

  // Listen for system preference changes while user hasn't explicitly chosen a theme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e: MediaQueryListEvent) => {
      const hasUserPreference =
        localStorage.getItem(THEME_STORAGE_KEY) !== null;
      if (!hasUserPreference) {
        const shouldBeDark = e.matches;
        if (shouldBeDark) {
          document.documentElement.classList.add("dark");
          setIsDark(true);
        } else {
          document.documentElement.classList.remove("dark");
          setIsDark(false);
        }
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  // Prevent flash of incorrect theme while loading
  if (isLoading) {
    return null;
  }

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};

/**
 * Custom hook to access dark mode state and toggle function
 * @returns {DarkModeToggleProps} Object containing isDark boolean and toggle function
 * @throws {Error} If used outside of DarkModeProvider
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useDarkMode(): DarkModeToggleProps {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
