import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import dayWidgetImg from "@/assets/global/day.png";
import nightWidgetImg from "@/assets/global/night.png";
import jazoImg from "@/assets/global/jazotur.png";
import moddiyImg from "@/assets/global/birmarta.png";
import inspektorImg from "@/assets/global/probatsiyains.png";
import aiImg from "@/assets/global/aiyordam.png";
import meyoriyImg from "@/assets/global/meyoriy.png";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import useCurrentDateTime from "@/hooks/useCurrentDateTime";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { timeStr, dateStr, isDay } = useCurrentDateTime();

  const widgetImg = isDay ? dayWidgetImg : nightWidgetImg;
  const widgetAlt = isDay ? "Kunduzgi vidjet" : "Tungi vidjet";

  const menuItems = [
    {
      id: "jazo",
      title: t("menu.jazo", "JAZO TURLARI HAQIDA"),
      path: "/jazo-turlari",
      iconImg: jazoImg,
      cardClass: styles.cardBlue,
    },
    {
      id: "moddiy",
      title: t("menu.moddiy", "BIR MARTALIK MODDIY YORDAM HAQIDA"),
      path: "/moddiy-yordam",
      iconImg: moddiyImg,
      cardClass: styles.cardGreen,
    },
    {
      id: "inspektorlar",
      title: t("menu.inspektorlar", "PROBATSIYA INSPEKTORLARI HAQIDA"),
      path: "/inspektorlar",
      iconImg: inspektorImg,
      cardClass: styles.cardPurple,
    },
    {
      id: "ai",
      title: t("menu.ai", "AI YORDAMCHI"),
      path: "/ai-yordamchi",
      iconImg: aiImg,
      cardClass: styles.cardOrange,
    },
    {
      id: "hujjatlar",
      title: t("menu.hujjatlar", "ME'YORIY-HUQUQIY HUJJATLAR"),
      path: "/hujjatlar",
      iconImg: meyoriyImg,
      cardClass: styles.cardTeal,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/")}
          aria-label={t("common.back", "Orqaga")}
        >
          <span>{t("common.back", "Назад")}</span>
          <div className={styles.backArrowCircle}>
            <ArrowLeft size={16} strokeWidth={3} />
          </div>
        </button>

        <LanguageSwitcher />
      </div>

      <div className={styles.topRightWidget}>
        <img
          src={widgetImg}
          alt={widgetAlt}
          className={styles.widgetImage}
        />
        <div className={styles.widgetDateTime}>
          <div className={styles.widgetTime}>{timeStr}</div>
          <div className={styles.widgetDate}>{dateStr}</div>
        </div>
      </div>

      <main className={styles.contentWrapper}>
        <div className={styles.headerCenter}>
          <h1 className={styles.mainTitle}>{t("menu.title", "PROBATSIYA")}</h1>
          <div className={styles.subTitleWrapper}>
            <div className={styles.titleLine} />
            <span className={styles.subTitle}>{t("menu.subtitle", "INFO KIOSK")}</span>
            <div className={styles.titleLine} />
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`${styles.card} ${item.cardClass}`}
              onClick={() => navigate(item.path)}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={item.iconImg}
                  alt={item.title}
                  className={styles.cardIconImg}
                />
              </div>
              <h2 className={styles.cardTitle}>{item.title}</h2>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <span className={styles.welcomeText}>
          {t("menu.welcome", "Asosiy menyuga xush kelibsiz")}
        </span>
      </footer>
    </div>
  );
};

export default Dashboard;
