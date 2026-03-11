import React, { useState, useEffect, createContext, useContext } from 'react';

/**
 * Custom hook to estimate reading time based on word count.
 * Assumes an average reading speed of 200 words per minute.
 * @param text The string content to analyze.
 * @returns The estimated reading time in minutes.
 */
export function useReadingTime(text: string) {
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s+/g).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    setReadingTime(minutes);
  }, [text]);

  return readingTime;
}

/**
 * Custom hook for a smooth counting animation.
 * Useful for displaying statistics that "count up" when the page loads.
 * @param targetValue The final number to reach.
 * @param duration The animation duration in milliseconds.
 * @returns The current animated count.
 */
export function useScrollCounter(targetValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * targetValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetValue, duration]);

  return count;
}

/**
 * Context and Provider for Dark Mode functionality.
 * Manages the 'dark' class on the document root and persists preference to localStorage.
 */
interface DarkModeContextType {
  isDark: boolean;
  toggle: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDark: false,
  toggle: () => {},
});

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggle = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ 
      isDark, 
      toggle
    }}>
      {children}
    </DarkModeContext.Provider>
  );
};

/**
 * Hook to access the Dark Mode context.
 * Allows components to check if dark mode is active and toggle it.
 */
export function useDarkMode() {
  return useContext(DarkModeContext);
}
