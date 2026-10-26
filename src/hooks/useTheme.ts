import { useState, useEffect } from "react";

export type ThemeMode = "dark" | "light";

const THEME_KEY = "app_theme";
const THEME_CHANGE_EVENT = "app_theme_changed";

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
};

export const applyTheme = (theme: ThemeMode) => {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  document.body.setAttribute("data-theme", theme);
  if (theme === "light") {
    document.documentElement.classList.add("theme-light");
    document.documentElement.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
    document.body.classList.remove("theme-dark");
  } else {
    document.documentElement.classList.add("theme-dark");
    document.documentElement.classList.remove("theme-light");
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
  }
};

export const useTheme = () => {
  const [theme, setThemeState] = useState<ThemeMode>(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeMode>;
      if (customEvent.detail) {
        setThemeState(customEvent.detail);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    };
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    localStorage.setItem(THEME_KEY, newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme);
    window.dispatchEvent(
      new CustomEvent(THEME_CHANGE_EVENT, { detail: newTheme }),
    );
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    setTheme,
    toggleTheme,
  };
};

export default useTheme;
