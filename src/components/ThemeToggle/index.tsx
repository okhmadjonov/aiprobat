import React from "react";
import { WiDayHaze } from "react-icons/wi";
import { IoCloudyNightSharp } from "react-icons/io5";
import { useTheme } from "@/hooks/useTheme";
import styles from "./ThemeToggle.module.scss";

export interface ThemeToggleProps {
  className?: string;
  style?: React.CSSProperties;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "", style }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`${styles.themeToggleContainer} ${className}`.trim()}
      style={style}
      onClick={(e) => e.stopPropagation()}
      role="group"
      aria-label="Mavzuni tanlash (Dark/Light)"
    >
      <button
        type="button"
        className={`${styles.toggleBtn} ${
          theme === "light" ? styles.active : ""
        }`}
        onClick={() => setTheme("light")}
        aria-label="Kunduzgi rejim (Light mode)"
        title="Kunduzgi rejim"
      >
        <WiDayHaze className={styles.themeIcon} size={24} />
      </button>

      <button
        type="button"
        className={`${styles.toggleBtn} ${
          theme === "dark" ? styles.active : ""
        }`}
        onClick={() => setTheme("dark")}
        aria-label="Tungi rejim (Dark mode)"
        title="Tungi rejim"
      >
        <IoCloudyNightSharp className={styles.themeIcon} size={18} />
      </button>
    </div>
  );
};

export default ThemeToggle;
