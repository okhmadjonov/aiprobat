import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/header";
import jazoImg from "@/assets/global/jazotur.png";
import moddiyImg from "@/assets/global/birmarta.png";
import inspektorImg from "@/assets/global/probatsiyains.png";
import aiImg from "@/assets/global/aiyordam.png";
import meyoriyImg from "@/assets/global/meyoriy.png";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <Header backPath="/" showHome={false} />

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
    </div>
  );
};

export default Dashboard;
