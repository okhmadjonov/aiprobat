import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Check } from "lucide-react";
import logoDocImg from "@/assets/logodoc.png";
import inspectorImg from "@/assets/global/inspektor.png";
import uzFlag from "@/assets/icons/uz-flag.webp";
import ruFlag from "@/assets/icons/ru-flag.webp";
import ThemeToggle from "@/components/ThemeToggle";
import useCurrentDateTime from "@/hooks/useCurrentDateTime";
import styles from "./Home.module.scss";

const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { timeStr, dateStr } = useCurrentDateTime();

  const currentLang = (i18n.language || "uz").toLowerCase().startsWith("ru") ? "ru" : "uz";

  const handleSelectLang = (lang: "uz" | "ru", e: React.MouseEvent) => {
    e.stopPropagation();
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const handleStart = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <header className={styles.topHeader}>
        <div className={styles.headerRightGroup}>
          <ThemeToggle />
          <div className={styles.dateTimeCol}>
            <div className={styles.widgetTime}>{timeStr}</div>
            <div className={styles.widgetDate}>{dateStr}</div>
          </div>
        </div>
      </header>

      <main className={styles.centerContent}>
        <div className={styles.inspectorWrapper}>
          {/* Orqa fondagi IIV gerbi watermarki - markazi aynan logo bilan ustma-ust */}
          <div className={styles.bgEmblemWatermark} aria-hidden="true">
            <img src={logoDocImg} alt="" className={styles.watermarkLogo} />
          </div>

          <img
            src={inspectorImg}
            alt="Probatsiya inspektori"
            className={styles.inspector}
            onClick={handleStart}
          />
        </div>

        <div className={styles.actionsRow}>
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.langBtn} ${
              currentLang === "uz" ? styles.activeLangBtn : ""
            }`}
            onClick={(e) => handleSelectLang("uz", e)}
            aria-label="O'zbek tili"
          >
            <img src={uzFlag} alt="" className={styles.flagIcon} />
            <span>O'zbekcha</span>
            {currentLang === "uz" && (
              <span className={styles.checkCircle}>
                <Check size={13} strokeWidth={3.5} />
              </span>
            )}
          </button>

          <button
            type="button"
            className={`${styles.actionBtn} ${styles.langBtn} ${
              currentLang === "ru" ? styles.activeLangBtn : ""
            }`}
            onClick={(e) => handleSelectLang("ru", e)}
            aria-label="Русский язык"
          >
            <img src={ruFlag} alt="" className={styles.flagIcon} />
            <span>Русский</span>
            {currentLang === "ru" && (
              <span className={styles.checkCircle}>
                <Check size={13} strokeWidth={3.5} />
              </span>
            )}
          </button>

          <button
            type="button"
            className={`${styles.actionBtn} ${styles.startBtn}`}
            onClick={handleStart}
            aria-label={t("common.continue", "Davom etish")}
          >
            <span>{t("common.continue", "Davom etish")}</span>
            <ArrowRight
              size={20}
              strokeWidth={2.6}
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
