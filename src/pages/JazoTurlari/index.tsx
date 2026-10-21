import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import homeIconImg from "@/assets/global/uyicon.png";
import styles from "./JazoTurlari.module.scss";

const JazoTurlari = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [currentDateTime, setCurrentDateTime] = useState("");

  const isRu = (i18n.language || "uz").toLowerCase().startsWith("ru");

  const jazoItems = [
    { id: "ati", code: isRu ? "ИТР —" : "ATI —", name: t("jazoTurlari.ati", "AXLOQ TUZATISH ISHLARI") },
    { id: "och", code: isRu ? "ОС —" : "OCH —", name: t("jazoTurlari.och", "OZODLIKNI CHEKLASH") },
    { id: "mji", code: isRu ? "ООР —" : "MJI —", name: t("jazoTurlari.mji", "MAJBURIY JAMOAT ISHLARI") },
    { id: "mxmq", code: isRu ? "ЛОП —" : "MXMQ —", name: t("jazoTurlari.mxmq", "MUAYYAN HUQUQDAN MAHRUM QILISH") },
    { id: "shs", code: isRu ? "УО —" : "SHS —", name: t("jazoTurlari.shs", "SHARTLI HUKM QILISH") },
    { id: "udo", code: isRu ? "УДО —" : "UDO —", name: t("jazoTurlari.udo", "UZOQ MUDDATLI OZOD QILISH") },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      setCurrentDateTime(`${hours}:${minutes} ${day}.${month}.${year}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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
          <h1 className={styles.headerTitle}>{t("jazoTurlari.title", "JAZO TURLARI HAQIDA")}</h1>
        </div>

        <div className={styles.headerRight}>
          <span className={styles.clockText}>{currentDateTime || "09:30 10.10.2026"}</span>
          <button
            className={styles.homeIconBtn}
            onClick={() => navigate("/dashboard")}
            aria-label="Bosh menyu"
          >
            <img
              src={homeIconImg}
              alt="Bosh sahifa"
              className={styles.homeIconImg}
            />
          </button>
          <LanguageSwitcher />
        </div>
      </header>

      <main className={styles.mainWrapper}>
        <div className={styles.whiteCard}>
          {jazoItems.map((item) => (
            <div
              key={item.id}
              className={styles.itemCard}
              onClick={() => navigate(`/jazo-turlari/batafsil?id=${item.id}`)}
            >
              <div className={styles.itemText}>
                <span className={styles.goldCode}>{item.code}</span>
                <span className={styles.navyName}>{item.name}</span>
              </div>
              <div className={styles.arrowCircle}>
                <ArrowRight size={18} strokeWidth={2.6} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JazoTurlari;
