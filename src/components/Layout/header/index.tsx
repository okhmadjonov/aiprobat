import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Home } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import styles from "./Header.module.scss";

// Mustaqil jonli soat komponenti
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
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(backPath);
    }
  };

  // Resolve display title (either from titleKey translation or title prop)
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

        {showLang && <LanguageSwitcher />}
      </div>
    </header>
  );
};

export default Header;
