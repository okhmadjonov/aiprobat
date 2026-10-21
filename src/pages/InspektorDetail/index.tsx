import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const regionNamesMap: Record<string, string> = {
  toshkent_sh: "Toshkent shahri",
  toshkent_vil: "Toshkent viloyati",
  samarqand: "Samarqand viloyati",
  fargona: "Fargʻona viloyati",
  andijon: "Andijon viloyati",
  namangan: "Namangan viloyati",
  qashqadaryo: "Qashqadaryo viloyati",
  surxondaryo: "Surxondaryo viloyati",
  buxoro: "Buxoro viloyati",
  xorazm: "Xorazm viloyati",
  jizzax: "Jizzax viloyati",
  navoiy: "Navoiy viloyati",
  sirdaryo: "Sirdaryo viloyati",
  qoraqalpogiston: "Qoraqalpog‘iston respublikasi",
};

const formatDistrictName = (raw: string): string => {
  if (!raw) return "Sho'rchi tumani";
  const formatted = raw
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return formatted.toLowerCase().includes("tumani") ? formatted : `${formatted} tumani`;
};

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
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const regParam = searchParams.get("region") || "";
  const distParam = searchParams.get("district") || "";

  const regionName = regionNamesMap[regParam] || (regParam ? regParam : "Surxondaryo viloyati");
  const districtName = formatDistrictName(distParam);

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
      value: `${regionName} IIB ${districtName} Probatsiya bo'linmasi`,
      isBlue: true,
    },
    {
      label: t("inspektorDetail.phone", "TELEFON RAQAMI"),
      value: "+998 90 747 63 90",
      isBlue: false,
    },
    {
      label: t("inspektorDetail.region", "VILOYAT"),
      value: regionName,
      isBlue: true,
    },
    {
      label: t("inspektorDetail.district", "TUMAN"),
      value: districtName,
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

      <main className={styles.mainWrapper}>
        <div className={styles.whiteCard}>
          <div className={styles.portraitContainer}>
            <img
              src={probatsiyaInsImg}
              alt="Probatsiya inspektori"
              className={styles.portraitImg}
            />
          </div>

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
