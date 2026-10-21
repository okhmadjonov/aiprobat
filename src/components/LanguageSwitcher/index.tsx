import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.scss";

export interface LanguageSwitcherProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "dark";
  onLanguageChange?: (lang: "uz" | "ru") => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
  style,
  variant = "default",
  onLanguageChange,
}) => {
  const { i18n } = useTranslation();

  const currentLang = (i18n.language || "uz").toLowerCase().startsWith("ru") ? "ru" : "uz";

  const handleToggleLang = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextLang = currentLang === "uz" ? "ru" : "uz";
    i18n.changeLanguage(nextLang);
    localStorage.setItem("lang", nextLang);
    if (onLanguageChange) onLanguageChange(nextLang);
  };

  return (
    <button
      type="button"
      className={`${styles.langBtn} ${
        variant === "dark" ? styles.variantDark : ""
      } ${className}`.trim()}
      style={style}
      onClick={handleToggleLang}
      aria-label="Tilni o'zgartirish"
    >
      {currentLang === "uz" ? "O'zb" : "Рус"}
    </button>
  );
};

export default LanguageSwitcher;
