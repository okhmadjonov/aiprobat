import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Home, Search } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import svgDistricts from "@/constants/tashkentSvgDistricts.json";
import styles from "./Inspektorlar.module.scss";

// 5.JPG dagi menyu ikonkalari
const UsersMenuSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 21V19C16 16.79 14.21 15 12 15H5C2.79 15 1 16.79 1 19V21"
      stroke="#113F77"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8.5" cy="7" r="4" stroke="#113F77" strokeWidth="2.2" />
    <path
      d="M20 8C21.66 8 23 9.34 23 11C23 12.66 21.66 14 20 14"
      stroke="#113F77"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M4 8C2.34 8 1 9.34 1 11C1 12.66 2.34 14 4 14"
      stroke="#113F77"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const FilesMenuSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.5 2H8.5C7.4 2 6.5 2.9 6.5 4V17C6.5 18.1 7.4 19 8.5 19H17.5C18.6 19 19.5 18.1 19.5 17V6L15.5 2Z"
      stroke="#113F77"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M4.5 7H3.5C2.4 7 1.5 7.9 1.5 9V20C1.5 21.1 2.4 22 3.5 22H14.5C15.6 22 16.5 21.1 16.5 20V19"
      stroke="#113F77"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const ChartMenuSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="18" rx="4" stroke="#113F77" strokeWidth="2.2" />
    <path d="M7 16V12M12 16V8M17 16V10" stroke="#113F77" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const ReportMenuSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
      stroke="#113F77"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M14 2V8H20" stroke="#113F77" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M9 13H15M9 17H13" stroke="#113F77" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const SettingsMenuSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3.2" stroke="#113F77" strokeWidth="2.2" />
    <path
      d="M19.4 15A1.65 1.65 0 0 0 19.73 16.82L20.06 17.15A2 2 0 1 1 17.23 19.98L16.9 19.65A1.65 1.65 0 0 0 15.08 19.32A1.65 1.65 0 0 0 14 20.87V21.5A2 2 0 1 1 10 21.5V20.87A1.65 1.65 0 0 0 8.92 19.32A1.65 1.65 0 0 0 7.1 19.65L6.77 19.98A2 2 0 1 1 3.94 17.15L4.27 16.82A1.65 1.65 0 0 0 4.6 15A1.65 1.65 0 0 0 3.05 13.92H2.5A2 2 0 1 1 2.5 9.92H3.05A1.65 1.65 0 0 0 4.6 8.84A1.65 1.65 0 0 0 4.27 7.02L3.94 6.69A2 2 0 1 1 6.77 3.86L7.1 4.19A1.65 1.65 0 0 0 8.92 4.52A1.65 1.65 0 0 0 10 2.97V2.5A2 2 0 1 1 14 2.5V2.97A1.65 1.65 0 0 0 15.08 4.52A1.65 1.65 0 0 0 16.9 4.19L17.23 3.86A2 2 0 1 1 20.06 6.69L19.73 7.02A1.65 1.65 0 0 0 19.4 8.84A1.65 1.65 0 0 0 20.95 9.92H21.5A2 2 0 1 1 21.5 13.92H20.95A1.65 1.65 0 0 0 19.4 15Z"
      stroke="#113F77"
      strokeWidth="2.2"
    />
  </svg>
);

// 5.JPG dagi inspektor (ofitser) ikonkasi
const OfficerSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8.5C4 6.8 7.5 4.5 12 4.5C16.5 4.5 20 6.8 20 8.5L19 10.5H5L4 8.5Z" fill="white" />
    <path d="M4.5 10.5C7 11.5 17 11.5 19.5 10.5V11.5C19.5 12 17 13 12 13C7 13 4.5 12 4.5 11.5V10.5Z" fill="#CBD5E1" />
    <circle cx="12" cy="7.5" r="1.2" fill="#D97706" />
    <circle cx="12" cy="13.5" r="3.2" fill="white" />
    <path d="M5 21C5 18 8 17 12 17C16 17 19 18 19 21" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// Dropdown chevron ikonkasi aylanada
const CircleChevronDown = () => (
  <div className={styles.dropdownIconCircle}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#0B2149" strokeWidth="2" />
      <path d="M8 10L12 14L16 10" stroke="#0B2149" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// Qora sichqoncha kursor ikonkasi (5.JPG dagi)
const BlackCursorSvg = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="black"
    className={styles.cursorPointerSvg}
  >
    <path d="M4 2L18 11L11.5 12.5L16 21L13 22.5L8.5 14L4 18V2Z" />
  </svg>
);

// Tumanlar ma'lumotlari xaritasi
interface DistrictInfo {
  id: string;
  name: string;
  displayName: string;
  count: number;
}

const districtDataMap: Record<string, DistrictInfo> = {
  "Olmazor tumani": { id: "olmazor", name: "Olmazor tumani", displayName: "Olmazor tumani", count: 928 },
  "Yunusobod tumani": { id: "yunusobod", name: "Yunusobod tumani", displayName: "Yunusobod tumani", count: 1102 },
  "Chilonzor tumani": { id: "chilonzor", name: "Chilonzor tumani", displayName: "Chilonzor tumani", count: 845 },
  "Mirzo ulug‘bek tumani": { id: "mirzo_ulugbek", name: "Mirzo ulug‘bek tumani", displayName: "Mirzo Ulug'bek tumani", count: 780 },
  "Shayxontoxur tumani": { id: "shayxontohur", name: "Shayxontoxur tumani", displayName: "Shayxontohur tumani", count: 654 },
  "Uchtepa tumani": { id: "uchtepa", name: "Uchtepa tumani", displayName: "Uchtepa tumani", count: 712 },
  "Yashnobod tumani": { id: "yashnobod", name: "Yashnobod tumani", displayName: "Yashnobod tumani", count: 830 },
  "Mirobod tumani": { id: "mirobod", name: "Mirobod tumani", displayName: "Mirobod tumani", count: 540 },
  "Yakkasaroy tumani": { id: "yakkasaroy", name: "Yakkasaroy tumani", displayName: "Yakkasaroy tumani", count: 410 },
  "Sirg‘ali tumani": { id: "sergeli", name: "Sirg‘ali tumani", displayName: "Sergeli tumani", count: 620 },
  "Yangihayot tumani": { id: "yangihayot", name: "Yangihayot tumani", displayName: "Yangihayot tumani", count: 390 },
  "Bektemir tumani": { id: "bektemir", name: "Bektemir tumani", displayName: "Bektemir tumani", count: 240 },
};

const Inspektorlar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("haqida");
  const [city, setCity] = useState("toshkent");
  const [region, setRegion] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("olmazor");
  const [searchQuery, setSearchQuery] = useState("");

  const isRu = (i18n.language || "uz").toLowerCase().startsWith("ru");

  const menuItems = [
    { id: "inspektorlar", label: t("inspektorlar.inspektorlar", "Inspektorlar"), icon: <UsersMenuSvg /> },
    { id: "vositalar", label: t("inspektorlar.vositalar", "Nazorat vositalari"), icon: <FilesMenuSvg /> },
    { id: "statistika", label: t("inspektorlar.statistika", "Statistika"), icon: <ChartMenuSvg /> },
    { id: "hisobotlar", label: t("inspektorlar.hisobotlar", "Hisobotlar"), icon: <ReportMenuSvg /> },
    { id: "sozlamalar", label: t("inspektorlar.sozlamalar", "Sozlamalar"), icon: <SettingsMenuSvg /> },
  ];

  // Hozirgi tanlangan tumanning SVG va ma'lumotlari
  const selectedDistrictObj =
    Object.values(districtDataMap).find((d) => d.id === selectedDistrictId) ||
    districtDataMap["Olmazor tumani"];

  const handleDistrictSelect = (districtId: string) => {
    setSelectedDistrictId(districtId);
  };

  return (
    <div className={styles.container}>
      {/* Chapdagi oq Sidebar paneli (5.JPG) */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
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

          <div
            className={styles.activeSectionCard}
            onClick={() => setActiveTab("haqida")}
          >
            {t("inspektorlar.title", "Probatsiya inspektorlari haqida")}
          </div>

          <div className={styles.menuList}>
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`${styles.menuItem} ${
                  activeTab === item.id ? styles.activeItem : ""
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <div className={styles.menuIcon}>{item.icon}</div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className={styles.homeCircleBtn}
          onClick={() => navigate("/dashboard")}
          aria-label={t("common.home", "Bosh sahifa")}
        >
          <Home size={22} strokeWidth={2.4} />
        </button>
      </aside>

      {/* O'ngdagi katta Asosiy panel (5.JPG) */}
      <main className={styles.mainPanel}>
        <div className={styles.headerRow}>
          <h1 className={styles.goldTitle}>{t("menu.inspektorlar", "PROBATSIYA INSPEKTORLARI HAQIDA")}</h1>
          <LanguageSwitcher variant="dark" />
        </div>

        {/* Real GeoJSON asosida chizilgan interaktiv Toshkent shahar tumanlari xaritasi */}
        <div className={styles.mapWrapper}>
          <svg
            viewBox="0 0 650 520"
            className={styles.mapSvg}
            xmlns="http://www.w3.org/2000/svg"
          >
            {svgDistricts.map((d) => {
              const info = districtDataMap[d.name];
              const isSelected = info && info.id === selectedDistrictId;

              return (
                <path
                  key={d.name}
                  d={d.d}
                  fill={isSelected ? "#1f3e82" : "#ccd2eb"}
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  className={styles.districtPath}
                  onClick={() => {
                    if (info) handleDistrictSelect(info.id);
                  }}
                >
                  <title>{info ? info.displayName : d.name}</title>
                </path>
              );
            })}
          </svg>

          {/* 5.JPG dagi oq ko'rsatkich Tooltip va qora kursor */}
          <div
            className={`${styles.mapTooltipBox} ${styles[`pos_${selectedDistrictObj.id}`] || ""}`}
          >
            <div className={styles.tooltipBubble}>
              <span className={styles.tooltipNumber}>
                {selectedDistrictObj.count} {t("inspektorlar.inspectorCount", "ta inspektor")}
              </span>
              <span className={styles.tooltipName}>
                {t(`inspektorlar.districts.${selectedDistrictObj.id}`, selectedDistrictObj.displayName)}
              </span>
            </div>
            <BlackCursorSvg />
          </div>
        </div>

        {/* Pastki boshqaruv qismi (Filters, Search, Button) */}
        <div className={styles.bottomControls}>
          <div className={styles.filtersRow}>
            <div className={styles.dropdownBox}>
              <select
                className={styles.dropdownSelect}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="toshkent">{t("inspektorlar.tashkentCity", "Toshkent shahri")}</option>
                <option value="samarqand">{isRu ? "город Самарканд" : "Samarqand shahri"}</option>
                <option value="buxoro">{isRu ? "город Бухара" : "Buxoro shahri"}</option>
              </select>
              <CircleChevronDown />
            </div>

            <div className={styles.dropdownBox}>
              <select
                className={styles.dropdownSelect}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">{isRu ? "По областям" : "Viloyatlar kesimida"}</option>
                <option value="toshkent_vil">{isRu ? "Ташкентская область" : "Toshkent viloyati"}</option>
                <option value="surxondaryo">{isRu ? "Сурхандарьинская область" : "Surxondaryo viloyati"}</option>
                <option value="fargona">{isRu ? "Ферганская область" : "Fargʻona viloyati"}</option>
              </select>
              <CircleChevronDown />
            </div>

            <div className={styles.dropdownBox}>
              <select
                className={styles.dropdownSelect}
                value={selectedDistrictId}
                onChange={(e) => handleDistrictSelect(e.target.value)}
              >
                {Object.values(districtDataMap).map((item) => (
                  <option key={item.id} value={item.id}>
                    {t(`inspektorlar.districts.${item.id}`, item.displayName)}
                  </option>
                ))}
              </select>
              <CircleChevronDown />
            </div>
          </div>

          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder={isRu ? "Поиск инспектора по ФИО...." : "Inspektor ism-familiyasini qidirish...."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={22} className={styles.searchIcon} strokeWidth={2.4} />
          </div>

          <button
            type="button"
            className={styles.inspectorDataBtn}
            onClick={() => navigate("/inspektorlar/batafsil")}
          >
            <OfficerSvg />
            <span>{isRu ? "Данные инспектора" : "Inspektor ma'lumotlari"}</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Inspektorlar;
