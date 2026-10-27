import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import UzbMap from "@/components/UzbMap";
import regionDistrictsDataRaw from "@/constants/regionDistrictsSvg.json";
import probatsiyaInsImg from "@/assets/global/probatsiyains.png";
import styles from "./Inspektorlar.module.scss";

const UsersMenuSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 21V19C16 16.79 14.21 15 12 15H5C2.79 15 1 16.79 1 19V21"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2.2" />
    <path
      d="M20 8C21.66 8 23 9.34 23 11C23 12.66 21.66 14 20 14"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M4 8C2.34 8 1 9.34 1 11C1 12.66 2.34 14 4 14"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const FilesMenuSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.5 2H8.5C7.4 2 6.5 2.9 6.5 4V17C6.5 18.1 7.4 19 8.5 19H17.5C18.6 19 19.5 18.1 19.5 17V6L15.5 2Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M4.5 7H3.5C2.4 7 1.5 7.9 1.5 9V20C1.5 21.1 2.4 22 3.5 22H14.5C15.6 22 16.5 21.1 16.5 20V19"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const ChartMenuSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="18" rx="4" stroke="currentColor" strokeWidth="2.2" />
    <path d="M7 16V12M12 16V8M17 16V10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const ReportMenuSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M9 13H15M9 17H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const SettingsMenuSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2.2" />
    <path
      d="M19.4 15A1.65 1.65 0 0 0 19.73 16.82L20.06 17.15A2 2 0 1 1 17.23 19.98L16.9 19.65A1.65 1.65 0 0 0 15.08 19.32A1.65 1.65 0 0 0 14 20.87V21.5A2 2 0 1 1 10 21.5V20.87A1.65 1.65 0 0 0 8.92 19.32A1.65 1.65 0 0 0 7.1 19.65L6.77 19.98A2 2 0 1 1 3.94 17.15L4.27 16.82A1.65 1.65 0 0 0 4.6 15A1.65 1.65 0 0 0 3.05 13.92H2.5A2 2 0 1 1 2.5 9.92H3.05A1.65 1.65 0 0 0 4.6 8.84A1.65 1.65 0 0 0 4.27 7.02L3.94 6.69A2 2 0 1 1 6.77 3.86L7.1 4.19A1.65 1.65 0 0 0 8.92 4.52A1.65 1.65 0 0 0 10 2.97V2.5A2 2 0 1 1 14 2.5V2.97A1.65 1.65 0 0 0 15.08 4.52A1.65 1.65 0 0 0 16.9 4.19L17.23 3.86A2 2 0 1 1 20.06 6.69L19.73 7.02A1.65 1.65 0 0 0 19.4 8.84A1.65 1.65 0 0 0 20.95 9.92H21.5A2 2 0 1 1 21.5 13.92H20.95A1.65 1.65 0 0 0 19.4 15Z"
      stroke="currentColor"
      strokeWidth="2.2"
    />
  </svg>
);

const CircleChevronDown = () => (
  <div className={styles.dropdownIconCircle}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const tashkentDistrictsList = [
  { id: "olmazor", name: "Olmazor tumani" },
  { id: "yunusobod", name: "Yunusobod tumani" },
  { id: "chilonzor", name: "Chilonzor tumani" },
  { id: "mirzo_ulugbek", name: "Mirzo Ulug'bek tumani" },
  { id: "shayxontohur", name: "Shayxontohur tumani" },
  { id: "uchtepa", name: "Uchtepa tumani" },
  { id: "yashnobod", name: "Yashnobod tumani" },
  { id: "mirobod", name: "Mirobod tumani" },
  { id: "yakkasaroy", name: "Yakkasaroy tumani" },
  { id: "sergeli", name: "Sergeli tumani" },
  { id: "yangihayot", name: "Yangihayot tumani" },
  { id: "bektemir", name: "Bektemir tumani" },
];

const regionDistrictsMap = regionDistrictsDataRaw as Record<
  string,
  { viewBox: string; features: { id: string; name: string; count: number }[] }
>;

const Inspektorlar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("haqida");
  const [city, setCity] = useState("all");
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { id: "inspektorlar", label: t("inspektorlar.inspektorlar", "Inspektorlar"), icon: <UsersMenuSvg /> },
    { id: "vositalar", label: t("inspektorlar.vositalar", "Nazorat vositalari"), icon: <FilesMenuSvg /> },
    { id: "statistika", label: t("inspektorlar.statistika", "Statistika"), icon: <ChartMenuSvg /> },
    { id: "hisobotlar", label: t("inspektorlar.hisobotlar", "Hisobotlar"), icon: <ReportMenuSvg /> },
    { id: "sozlamalar", label: t("inspektorlar.sozlamalar", "Sozlamalar"), icon: <SettingsMenuSvg /> },
  ];

  const regionOptions = [
    { id: "", label: t("inspektorlar.regions.all", "Viloyatlar kesimida (Barchasi)") },
    { id: "toshkent_sh", label: t("inspektorlar.regions.toshkent_sh", "Toshkent shahri") },
    { id: "toshkent_vil", label: t("inspektorlar.regions.toshkent_vil", "Toshkent viloyati") },
    { id: "samarqand", label: t("inspektorlar.regions.samarqand", "Samarqand viloyati") },
    { id: "fargona", label: t("inspektorlar.regions.fargona", "Fargʻona viloyati") },
    { id: "andijon", label: t("inspektorlar.regions.andijon", "Andijon viloyati") },
    { id: "namangan", label: t("inspektorlar.regions.namangan", "Namangan viloyati") },
    { id: "qashqadaryo", label: t("inspektorlar.regions.qashqadaryo", "Qashqadaryo viloyati") },
    { id: "surxondaryo", label: t("inspektorlar.regions.surxondaryo", "Surxondaryo viloyati") },
    { id: "buxoro", label: t("inspektorlar.regions.buxoro", "Buxoro viloyati") },
    { id: "xorazm", label: t("inspektorlar.regions.xorazm", "Xorazm viloyati") },
    { id: "jizzax", label: t("inspektorlar.regions.jizzax", "Jizzax viloyati") },
    { id: "navoiy", label: t("inspektorlar.regions.navoiy", "Navoiy viloyati") },
    { id: "sirdaryo", label: t("inspektorlar.regions.sirdaryo", "Sirdaryo viloyati") },
    { id: "qoraqalpogiston", label: t("inspektorlar.regions.qoraqalpogiston", "Qoraqalpog‘iston respublikasi") },
  ];

  const currentDistrictsList = useMemo(() => {
    if (selectedRegionId === "toshkent_sh" || city === "toshkent") {
      return tashkentDistrictsList;
    }
    if (selectedRegionId && regionDistrictsMap[selectedRegionId]) {
      return regionDistrictsMap[selectedRegionId].features.map((f) => ({
        id: f.id,
        name: f.name,
      }));
    }
    return tashkentDistrictsList;
  }, [selectedRegionId, city]);

  const filteredDistrictsList = useMemo(() => {
    if (!searchQuery.trim()) return currentDistrictsList;
    const q = searchQuery.toLowerCase();
    return currentDistrictsList.filter((d) => d.name.toLowerCase().includes(q));
  }, [currentDistrictsList, searchQuery]);

  const handleGoToDetail = () => {
    const params = new URLSearchParams();
    if (selectedRegionId) params.set("region", selectedRegionId);
    if (selectedDistrictId) params.set("district", selectedDistrictId);
    navigate(`/inspektorlar/batafsil?${params.toString()}`);
  };

  return (
    <Layout title={t("menu.inspektorlar", "PROBATSIYA INSPEKTORLARI HAQIDA")}>
      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            {/* <div
              className={styles.activeSectionCard}
              onClick={() => setActiveTab("inspektorlar")}
            >
              {t("inspektorlar.title", "Probatsiya inspektorlari haqida")}
            </div> */}

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
        </aside>

        <main className={styles.mainPanel}>

        {activeTab === "statistika" && (
          <div className={styles.tabContentPanel}>
            <h2 className={styles.panelTitle}>Respublika bo'yicha probatsiya statistikasi</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>42,850</span>
                <span className={styles.statLabel}>Jami hisobda turgan shaxslar</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>31,420</span>
                <span className={styles.statLabel}>Bandligi ta'minlanganlar (73.3%)</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>2,410</span>
                <span className={styles.statLabel}>Elektron bilaguzuk taqilganlar</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>8,640</span>
                <span className={styles.statLabel}>Moddiy yordam olganlar</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "vositalar" && (
          <div className={styles.tabContentPanel}>
            <h2 className={styles.panelTitle}>Raqamli monitoring va nazorat vositalari</h2>
            <div className={styles.toolsList}>
              <div className={styles.toolItem}>
                <span className={styles.toolTitle}>GPS / LBS Elektron bilaguzuk tizimi</span>
                <span className={styles.toolStatus}>Faol ishlamoqda</span>
              </div>
              <div className={styles.toolItem}>
                <span className={styles.toolTitle}>Face ID Biometrik verifikatsiya</span>
                <span className={styles.toolStatus}>Faol ishlamoqda</span>
              </div>
              <div className={styles.toolItem}>
                <span className={styles.toolTitle}>E-Probatsiya integratsiyalashgan axborot tizimi</span>
                <span className={styles.toolStatus}>Faol ishlamoqda</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hisobotlar" && (
          <div className={styles.tabContentPanel}>
            <h2 className={styles.panelTitle}>Tizim hisobotlari va monitoring axborotlari</h2>
            <div className={styles.toolsList}>
              <div className={styles.toolItem}>
                <span className={styles.toolTitle}>Oylik nazorat va profilaktika monitoringi</span>
                <span className={styles.toolStatus}>Mavjud</span>
              </div>
              <div className={styles.toolItem}>
                <span className={styles.toolTitle}>Mahkumlarning ijtimoiy reabilitatsiyasi to'g'risida axborot</span>
                <span className={styles.toolStatus}>Mavjud</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "sozlamalar" && (
          <div className={styles.tabContentPanel}>
            <h2 className={styles.panelTitle}>Tizim sozlamalari</h2>
            <div className={styles.toolsList}>
              <div className={styles.toolItem}>
                <span className={styles.toolTitle}>Dasturiy ta'minot: Probatsiya Kiosk Edition v2.4</span>
                <span className={styles.toolStatus}>Eng so'nggi versiya</span>
              </div>
              <div className={styles.toolItem}>
                <span className={styles.toolTitle}>Xavfsiz IIV ichki tarmog'iga ulanish</span>
                <span className={styles.toolStatus}>Himoyalangan</span>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "inspektorlar" || activeTab === "haqida") && (
          <>
            <div className={styles.mapWrapper}>
              <UzbMap
                selectedRegionId={selectedRegionId}
                selectedDistrictId={selectedDistrictId}
                onSelectRegion={(regId) => {
                  setSelectedRegionId(regId);
                  if (regId === "toshkent_sh") {
                    setCity("toshkent");
                  } else {
                    setCity("all");
                  }
                  setSelectedDistrictId("");
                }}
                onSelectDistrict={(distId) => {
                  setSelectedDistrictId(distId);
                }}
                onBackToUzbekistan={() => {
                  setSelectedRegionId("");
                  setSelectedDistrictId("");
                  setCity("all");
                }}
              />
            </div>

            <div className={styles.bottomControls}>
              <div className={styles.filtersRow}>
                <div className={styles.dropdownBox}>
                  <select
                    className={styles.dropdownSelect}
                    value={city}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCity(val);
                      if (val === "toshkent") {
                        setSelectedRegionId("toshkent_sh");
                      } else if (val === "samarqand") {
                        setSelectedRegionId("samarqand");
                      } else if (val === "buxoro") {
                        setSelectedRegionId("buxoro");
                      } else {
                        setSelectedRegionId("");
                      }
                      setSelectedDistrictId("");
                    }}
                  >
                    <option value="all">{t("inspektorlar.allCities", "Barcha shaharlar")}</option>
                    <option value="toshkent">{t("inspektorlar.tashkentCity", "Toshkent shahri")}</option>
                    <option value="samarqand">{t("inspektorlar.samarkandCity", "Samarqand shahri")}</option>
                    <option value="buxoro">{t("inspektorlar.bukharaCity", "Buxoro shahri")}</option>
                  </select>
                  <CircleChevronDown />
                </div>

                <div className={styles.dropdownBox}>
                  <select
                    className={styles.dropdownSelect}
                    value={selectedRegionId}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedRegionId(val);
                      if (val === "toshkent_sh") {
                        setCity("toshkent");
                      } else {
                        setCity("all");
                      }
                      setSelectedDistrictId("");
                    }}
                  >
                    {regionOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <CircleChevronDown />
                </div>

                <div className={styles.dropdownBox}>
                  <select
                    className={styles.dropdownSelect}
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                  >
                    <option value="">{t("inspektorlar.chooseDistrict", "Tumanni tanlang")}</option>
                    {filteredDistrictsList.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
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
                  placeholder={t("inspektorlar.searchPlaceholder", "Inspektor ism-familiyasini qidirish....")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={22} className={styles.searchIcon} strokeWidth={2.4} />
              </div>

              <button
                type="button"
                className={styles.inspectorDataBtn}
                onClick={handleGoToDetail}
              >
                <img
                  src={probatsiyaInsImg}
                  alt="Probatsiya inspektori"
                  className={styles.inspectorBtnIcon}
                />
                <span>{t("inspektorlar.inspectorData", "Inspektor ma'lumotlari")}</span>
              </button>
            </div>
          </>
        )}
      </main>
      </div>
    </Layout>
  );
};

export default Inspektorlar;
