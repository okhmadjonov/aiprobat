import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Home } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import styles from "./ModdiyYordam.module.scss";

// 1. Info Icon ("Moddiy yordam nima ?") - 4.JPG dagidek
const InfoSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="2" fill="white" />
    <path
      d="M10 11H12V18M12 18H14M12 18H10"
      stroke="white"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 2. Hierarchy Icon ("Ajratish ketma-ketligi (sxema)") - 4.JPG dagidek
const HierarchySvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="3" width="8" height="6" rx="1.2" fill="white" />
    <path
      d="M12 9V14M12 14H5V17M12 14H19V17"
      stroke="white"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="2" y="17" width="6" height="5" rx="1.2" fill="white" />
    <rect x="16" y="17" width="6" height="5" rx="1.2" fill="white" />
  </svg>
);

// 3. Document Icon ("Kerakli hujjatlar ro'yxati") - 4.JPG dagidek
const DocumentSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 3H14L19 8V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V4C5 3.4 5.4 3 6 3Z"
      stroke="white"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path d="M14 3V8H19" stroke="white" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M9 12H15M9 16H13" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

// 4. Pencil Icon ("Ariza namunasi") - 4.JPG dagidek
const PencilSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.5 3.5L20.5 7.5L7 21H3V17L16.5 3.5Z"
      stroke="white"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M13.5 6.5L17.5 10.5" stroke="white" strokeWidth="2.4" />
  </svg>
);

// 5. Question Icon ("Ko'p beriladigan savollar") - 4.JPG dagidek
const QuestionSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.5 9C9.5 7.6 10.6 6.4 12 6.4C13.4 6.4 14.5 7.6 14.5 9C14.5 10.8 12 11.5 12 13.5"
      stroke="white"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="17.5" r="1.6" fill="white" />
  </svg>
);

// O'ng tomondagi doiracha ichidagi oq strelka
const ArrowRightSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="white"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Mustaqil soat komponenti
const LiveClock = () => {
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

const ModdiyYordam = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const helpTopics = [
    {
      id: "what",
      title: t("moddiyYordam.what", "Moddiy yordam nima ?"),
      icon: <InfoSvg />,
    },
    {
      id: "flow",
      title: t("moddiyYordam.flow", "Ajratish ketma-ketligi (sxema)"),
      icon: <HierarchySvg />,
    },
    {
      id: "docs",
      title: t("moddiyYordam.docs", "Kerakli hujjatlar ro'yxati"),
      icon: <DocumentSvg />,
    },
    {
      id: "sample",
      title: t("moddiyYordam.sample", "Ariza namunasi"),
      icon: <PencilSvg />,
    },
    {
      id: "faq",
      title: t("moddiyYordam.faq", "Ko'p beriladigan savollar"),
      icon: <QuestionSvg />,
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/dashboard")}
            aria-label={t("common.back", "Orqaga")}
          >
            <span>{t("common.back", "Назад")}</span>
            <div className={styles.backArrowCircle}>
              <ArrowLeft size={16} strokeWidth={3} />
            </div>
          </button>
          <h1 className={styles.headerTitle}>{t("moddiyYordam.title", "BIR MARTALIK MODDIY YORDAM HAQIDA")}</h1>
        </div>

        <div className={styles.headerRight}>
          <LiveClock />
          <button
            className={styles.homeBtn}
            onClick={() => navigate("/dashboard")}
            aria-label={t("common.home", "Bosh sahifa")}
          >
            <Home size={20} strokeWidth={2.4} />
          </button>
          <LanguageSwitcher />
        </div>
      </header>

      <main className={styles.mainWrapper}>
        <div className={styles.whiteCard}>
          {helpTopics.map((topic) => (
            <button
              type="button"
              key={topic.id}
              className={styles.itemCard}
              onClick={() => {
                // Kelgusida kerakli sub-modal yoki tafsilot sahifasiga yo'naltirish mumkin
              }}
            >
              <div className={styles.leftSide}>
                <div className={styles.circleIcon}>{topic.icon}</div>
                <span className={styles.itemTitle}>{topic.title}</span>
              </div>
              <div className={styles.arrowCircle}>
                <ArrowRightSvg />
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ModdiyYordam;
