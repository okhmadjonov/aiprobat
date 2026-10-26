import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Home, Check } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import uzFlag from "@/assets/icons/uz-flag.webp";
import ruFlag from "@/assets/icons/ru-flag.webp";
import styles from "./Header.module.scss";

export const LiveClock = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      setDateTime(`${hours}:${minutes} ${day}.${month}.${year}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span className={styles.clockText}>{dateTime || "09:30 10.10.2026"}</span>;
};

export interface HeaderProps {
  title?: string;
  titleKey?: string;
  titleExtra?: React.ReactNode;
  onBack?: () => void;
  backPath?: string;
  showBack?: boolean;
  showHome?: boolean;
  showLang?: boolean;
  showTheme?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  titleKey,
  titleExtra,
  onBack,
  backPath = "/dashboard",
  showBack = true,
  showHome = true,
  showLang = true,
  showTheme = true,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isRu = (i18n.language || "uz").toLowerCase().startsWith("ru");
  const currentLang = isRu ? "ru" : "uz";

  const handleSelectLang = (lang: "uz" | "ru") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(backPath);
    }
  };

  const displayTitle = titleKey ? t(titleKey, title || "") : title;

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        {showBack && (
          <button
            type="button"
            className={styles.backBtn}
            onClick={handleBackClick}
            aria-label={t("common.back", "Orqaga")}
          >
            <span>{t("common.back", "Назад")}</span>
            <div className={styles.backArrowCircle}>
              <ArrowLeft size={16} strokeWidth={3} />
            </div>
          </button>
        )}

        <div className={styles.titleArea}>
          {displayTitle && <h1 className={styles.headerTitle}>{displayTitle}</h1>}
          {titleExtra}
        </div>
      </div>

      {showLang && (
        <div className={styles.headerCenter}>
          <div className={styles.langPillsRow}>
            <button
              type="button"
              className={`${styles.langPill} ${
                currentLang === "uz" ? styles.activeLangPill : ""
              }`}
              onClick={() => handleSelectLang("uz")}
              aria-label="O'zbek tili"
            >
              <img src={uzFlag} alt="" className={styles.flagIcon} />
              <span>O'zbekcha</span>
              {currentLang === "uz" && (
                <span className={styles.checkCircle}>
                  <Check size={12} strokeWidth={3.5} />
                </span>
              )}
            </button>

            <button
              type="button"
              className={`${styles.langPill} ${
                currentLang === "ru" ? styles.activeLangPill : ""
              }`}
              onClick={() => handleSelectLang("ru")}
              aria-label="Русский язык"
            >
              <img src={ruFlag} alt="" className={styles.flagIcon} />
              <span>Русский</span>
              {currentLang === "ru" && (
                <span className={styles.checkCircle}>
                  <Check size={12} strokeWidth={3.5} />
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      <div className={styles.headerRight}>
        <LiveClock />

        {showHome && (
          <button
            type="button"
            className={styles.homeBtn}
            onClick={() => navigate("/dashboard")}
            aria-label={t("common.home", "Bosh sahifa")}
          >
            <Home size={20} strokeWidth={2.4} />
          </button>
        )}

        {showTheme && <ThemeToggle />}
      </div>
    </header>
  );
};

export default Header;
