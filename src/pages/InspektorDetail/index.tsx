import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/header";
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
      <Header
        title={t("inspektorDetail.title", "INSPEKTORLAR")}
        onBack={() => navigate("/inspektorlar")}
      />

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
