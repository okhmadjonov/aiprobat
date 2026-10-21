import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Home } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import probatsiyaInsImg from "@/assets/global/probatsiyains.png";
import styles from "./InspektorDetail.module.scss";

interface InspectorRow {
  label: string;
  value: string;
  isBlue: boolean;
}

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

const InspektorDetail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const inspectorRows: InspectorRow[] = [
    {
      label: t("inspektorDetail.fio", "F.I.SH"),
      value: t("inspektorDetail.fioVal", "Usmonov Elbek O'roqaliyevich"),
      isBlue: true,
    },
    {
      label: t("inspektorDetail.birthYear", "TUG'ILGAN YILI"),
      value: "01.01.1990",
      isBlue: false,
    },
    {
      label: t("inspektorDetail.orgName", "TASHKILOT NOMI"),
      value: t("inspektorDetail.orgVal", "Surxondaryo viloyati IIB Sho'rchi tumani IIB"),
      isBlue: true,
    },
    {
      label: t("inspektorDetail.phone", "TELEFON RAQAMI"),
      value: "+998 90 747 63 90",
      isBlue: false,
    },
    {
      label: t("inspektorDetail.region", "VILOYAT"),
      value: t("inspektorDetail.regionVal", "Surxondaryo viloyati"),
      isBlue: true,
    },
    {
      label: t("inspektorDetail.district", "TUMAN"),
      value: t("inspektorDetail.districtVal", "Sho'rchi tumani"),
      isBlue: false,
    },
    {
      label: t("inspektorDetail.date", "SANA"),
      value: "15.10.2026 18:40",
      isBlue: true,
    },
    {
      label: t("inspektorDetail.status", "HOLATI"),
      value: t("inspektorDetail.active", "FAOL"),
      isBlue: false,
    },
  ];

  return (
    <div className={styles.container}>
      {/* 5.1.JPG Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/inspektorlar")}
            aria-label={t("common.back", "Orqaga")}
          >
            <span>{t("common.back", "Назад")}</span>
            <div className={styles.backArrowCircle}>
              <ArrowLeft size={16} strokeWidth={3} />
            </div>
          </button>
          <h1 className={styles.headerTitle}>{t("inspektorDetail.title", "INSPEKTORLAR")}</h1>
        </div>

        <div className={styles.headerRight}>
          <LiveClock />
          <button
            className={styles.homeBtn}
            onClick={() => navigate("/dashboard")}
            aria-label="Bosh sahifa"
          >
            <Home size={20} strokeWidth={2.4} />
          </button>
          <LanguageSwitcher />
        </div>
      </header>

      {/* 5.1.JPG Asosiy karta */}
      <main className={styles.mainWrapper}>
        <div className={styles.whiteCard}>
          {/* Chapdagi inspektor portreti */}
          <div className={styles.portraitContainer}>
            <img
              src={probatsiyaInsImg}
              alt="Probatsiya inspektori"
              className={styles.portraitImg}
            />
          </div>

          {/* O'ngdagi ma'lumotlar ro'yxati (5.1.JPG Zebra kapsulalar) */}
          <div className={styles.infoContainer}>
            <h2 className={styles.sectionTitle}>INSPEKTORLAR</h2>

            <div className={styles.recordsList}>
              {inspectorRows.map((row, idx) => (
                <div
                  key={idx}
                  className={row.isBlue ? styles.blueRow : styles.whiteRow}
                >
                  <span className={styles.label}>{row.label}</span>
                  <span className={styles.value}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InspektorDetail;
