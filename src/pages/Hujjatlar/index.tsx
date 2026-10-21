import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Home } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import styles from "./Hujjatlar.module.scss";

// 7.JPG dagi SVG ikonkalar
const OpenBookSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 5C2 4.4 2.4 4 3 4C6.5 4 10 5.5 12 7C14 5.5 17.5 4 21 4C21.6 4 22 4.4 22 5V18C22 18.6 21.6 19 21 19C17.5 19 14 20.5 12 22C10 20.5 6.5 19 3 19C2.4 19 2 18.6 2 18V5Z"
      stroke="white"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M12 7V22" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const DocumentSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 3H14L19 8V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V4C5 3.4 5.4 3 6 3Z"
      stroke="white"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M14 3V8H19" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M9 12H15M9 16H13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const LandmarkSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 21H21M4 18H20M5 10V18M9 10V18M15 10V18M19 10V18"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path d="M12 3L2 9H22L12 3Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
);

const ListItemsSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="7" r="1.5" fill="white" />
    <circle cx="5" cy="12" r="1.5" fill="white" />
    <circle cx="5" cy="17" r="1.5" fill="white" />
    <path d="M9 7H19M9 12H19M9 17H19" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

// Pastdagi Audio ikonkasi
const AudioSpeakerSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2.4" strokeLinejoin="round" />
    <path
      d="M15.54 8.46C16.48 9.4 17 10.66 17 12C17 13.34 16.48 14.6 15.54 15.54M19.07 4.93C20.94 6.8 22 9.35 22 12C22 14.65 20.94 17.2 19.07 19.07"
      stroke="white"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

// O'ng tomondagi doiracha ichidagi oq strelka
const ArrowRightSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const Hujjatlar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 7.JPG dagi 6 ta bo'lim
  const documentItems = [
    { id: "qonunlar", title: t("hujjatlar.qonunlar", "Qonunlar"), icon: <OpenBookSvg /> },
    { id: "farmonlar", title: t("hujjatlar.farmonlar", "Prezident farmonlari"), icon: <DocumentSvg /> },
    {
      id: "qarorlar",
      title: t("hujjatlar.qarorlar", "Vazirlar Mahkamasi qarorlari"),
      icon: <LandmarkSvg />,
    },
    { id: "iiv", title: t("hujjatlar.iiv", "IIV buyruqlari"), icon: <OpenBookSvg /> },
    {
      id: "nizomlar",
      title: t("hujjatlar.nizomlar", "Nizomlar va yo'riqnomalar"),
      icon: <ListItemsSvg />,
    },
    { id: "boshqa", title: t("hujjatlar.boshqa", "Boshqa hujjatlar"), icon: <DocumentSvg /> },
  ];

  return (
    <div className={styles.container}>
      {/* 7.JPG Header */}
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
          <h1 className={styles.headerTitle}>{t("hujjatlar.title", "ME'YORIY –HUQUQIY HUJJATLAR")}</h1>
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

      {/* 7.JPG Asosiy karta */}
      <main className={styles.mainWrapper}>
        <div className={styles.whiteCard}>
          {/* 6 ta gorizontal qator */}
          <div className={styles.docsList}>
            {documentItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className={styles.docCard}
                onClick={() => navigate("/jazo-turlari/batafsil")}
              >
                <div className={styles.docLeft}>
                  <div className={styles.docIconBadge}>{item.icon}</div>
                  <span className={styles.docTitle}>{item.title}</span>
                </div>
                <div className={styles.arrowCircle}>
                  <ArrowRightSvg />
                </div>
              </button>
            ))}
          </div>

          {/* Pastdagi 2 ta Katta to'q ko'k tugma */}
          <div className={styles.bottomActionsRow}>
            <button
              type="button"
              className={styles.actionBigBtn}
              onClick={() => {
                // Audio shaklda eshitish funksiyasi
              }}
            >
              <AudioSpeakerSvg />
              <span>{t("hujjatlar.audio", "Audio shaklda eshitish")}</span>
            </button>

            <button
              type="button"
              className={styles.actionBigBtn}
              onClick={() => navigate("/jazo-turlari/batafsil")}
            >
              <OpenBookSvg />
              <span>{t("hujjatlar.ebook", "Elektron kitob shaklda o'qish")}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hujjatlar;
