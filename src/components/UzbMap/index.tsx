import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import uzbRegionsData from "@/constants/uzbRegionsSvg.json";
import regionDistrictsDataRaw from "@/constants/regionDistrictsSvg.json";
import tashkentDistrictsData from "@/constants/tashkentSvgDistricts.json";
import styles from "./UzbMap.module.scss";

interface DistrictItem {
  id: string;
  name: string;
  count: number;
  centroid: [number, number];
  d: string;
}

interface RegionItem {
  id: string;
  name: string;
  count: number;
  centroid: [number, number];
  d: string;
}

interface UzbMapProps {
  selectedRegionId?: string;
  selectedDistrictId?: string;
  onSelectRegion?: (regionId: string, regionName: string) => void;
  onSelectDistrict?: (districtId: string, districtName: string) => void;
  onBackToUzbekistan?: () => void;
}

// Qora kursor SVG belgisi
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

// Toshkent shahar tumanlari ID va sonlari xaritasi
const tashkentDistrictCounts: Record<string, { id: string; count: number; name: string }> = {
  "Olmazor tumani": { id: "olmazor", count: 928, name: "Olmazor tumani" },
  "Yunusobod tumani": { id: "yunusobod", count: 1102, name: "Yunusobod tumani" },
  "Chilonzor tumani": { id: "chilonzor", count: 845, name: "Chilonzor tumani" },
  "Mirzo ulug‘bek tumani": { id: "mirzo_ulugbek", count: 780, name: "Mirzo Ulug'bek tumani" },
  "Shayxontoxur tumani": { id: "shayxontohur", count: 654, name: "Shayxontohur tumani" },
  "Uchtepa tumani": { id: "uchtepa", count: 712, name: "Uchtepa tumani" },
  "Yashnobod tumani": { id: "yashnobod", count: 830, name: "Yashnobod tumani" },
  "Mirobod tumani": { id: "mirobod", count: 540, name: "Mirobod tumani" },
  "Yakkasaroy tumani": { id: "yakkasaroy", count: 410, name: "Yakkasaroy tumani" },
  "Sirg‘ali tumani": { id: "sergeli", count: 620, name: "Sergeli tumani" },
  "Yangihayot tumani": { id: "yangihayot", count: 390, name: "Yangihayot tumani" },
  "Bektemir tumani": { id: "bektemir", count: 240, name: "Bektemir tumani" },
};

const regionDistrictsData = (regionDistrictsDataRaw as unknown) as Record<
  string,
  { viewBox: string; features: DistrictItem[] }
>;

export const UzbMap = ({
  selectedRegionId = "",
  selectedDistrictId = "",
  onSelectRegion,
  onSelectDistrict,
  onBackToUzbekistan,
}: UzbMapProps) => {
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = useState<{
    id: string;
    name: string;
    count: number;
    centroid: [number, number];
  } | null>(null);

  const isRegionView = Boolean(selectedRegionId && selectedRegionId !== "uzbekistan");

  const currentRegionObj = useMemo(() => {
    return uzbRegionsData.features.find((r) => r.id === selectedRegionId) || null;
  }, [selectedRegionId]);

  const toshkentShaharItem = useMemo(() => {
    return uzbRegionsData.features.find((r) => r.id === "toshkent_sh") || null;
  }, []);

  const isTashkentCity = selectedRegionId === "toshkent_sh" || selectedRegionId === "toshkent";

  const districtsData = useMemo(() => {
    if (!isRegionView) return null;

    if (isTashkentCity) {
      return {
        viewBox: "0 0 650 520",
        items: tashkentDistrictsData.map((d) => {
          const info = tashkentDistrictCounts[d.name] || {
            id: d.name.toLowerCase().replace(/[^a-z0-9]/g, "_"),
            count: 500,
            name: d.name,
          };
          return {
            id: info.id,
            name: d.name,
            displayName: info.name,
            count: info.count,
            centroid: [d.centerX, d.centerY] as [number, number],
            d: d.d,
          };
        }),
      };
    }

    const regData = regionDistrictsData[selectedRegionId];
    if (regData) {
      return {
        viewBox: regData.viewBox,
        items: regData.features.map((f) => ({
          id: f.id,
          name: f.name,
          displayName: f.name,
          count: f.count,
          centroid: f.centroid,
          d: f.d,
        })),
      };
    }

    return null;
  }, [isRegionView, isTashkentCity, selectedRegionId]);

  const currentViewBox = useMemo(() => {
    if (isRegionView && districtsData) {
      return districtsData.viewBox;
    }
    return uzbRegionsData.viewBox;
  }, [isRegionView, districtsData]);

  const [vbW, vbH] = useMemo(() => {
    const parts = currentViewBox.split(" ").map(Number);
    return [parts[2] || 880, parts[3] || 520];
  }, [currentViewBox]);

  const activeTooltip = useMemo(() => {
    if (hoveredItem) return hoveredItem;

    if (isRegionView && districtsData) {
      const selectedDist = districtsData.items.find(
        (it) => it.id === selectedDistrictId || it.name === selectedDistrictId
      );
      if (selectedDist) {
        return {
          id: selectedDist.id,
          name: selectedDist.displayName,
          count: selectedDist.count,
          centroid: selectedDist.centroid,
        };
      }
      if (districtsData.items[0]) {
        const first = districtsData.items[0];
        return {
          id: first.id,
          name: first.displayName,
          count: first.count,
          centroid: first.centroid,
        };
      }
    }

    if (!isRegionView) {
      const selReg = uzbRegionsData.features.find((r) => r.id === selectedRegionId);
      if (selReg) {
        return {
          id: selReg.id,
          name: selReg.name,
          count: selReg.count,
          centroid: selReg.centroid as [number, number],
        };
      }
    }

    return null;
  }, [hoveredItem, isRegionView, districtsData, selectedDistrictId, selectedRegionId]);

  const handleRegionClick = (reg: RegionItem) => {
    if (onSelectRegion) {
      onSelectRegion(reg.id, reg.name);
    }
  };

  const handleDistrictClick = (distId: string, distName: string) => {
    if (onSelectDistrict) {
      onSelectDistrict(distId, distName);
    }
  };

  return (
    <div className={styles.mapContainer}>
      {isRegionView && (
        <button
          type="button"
          className={styles.backToUzbBtn}
          onClick={onBackToUzbekistan}
          aria-label={t("inspektorlar.backToUzb", "O'zbekiston xaritasi")}
        >
          <div className={styles.backIconCircle}>
            <ArrowLeft size={14} strokeWidth={2.8} />
          </div>
          <span>{t("inspektorlar.backToUzb", "O'zbekiston xaritasi")}</span>
        </button>
      )}

      {isRegionView && currentRegionObj && (
        <div className={styles.regionBadge}>{currentRegionObj.name}</div>
      )}

      <svg
        viewBox={currentViewBox}
        className={styles.mapSvg}
        xmlns="http://www.w3.org/2000/svg"
      >
        {!isRegionView &&
          uzbRegionsData.features.map((reg) => {
            const isSelected = reg.id === selectedRegionId;
            return (
              <path
                key={reg.id}
                d={reg.d}
                fill={isSelected ? "#1f3e82" : "#C6C8E1"}
                stroke="#162c54"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                className={`${styles.regionPath} ${isSelected ? styles.selectedPath : ""}`}
                onClick={() => handleRegionClick(reg as RegionItem)}
                onMouseEnter={() =>
                  setHoveredItem({
                    id: reg.id,
                    name: reg.name,
                    count: reg.count,
                    centroid: reg.centroid as [number, number],
                  })
                }
                onMouseLeave={() => setHoveredItem(null)}
              >
                <title>{reg.name}</title>
              </path>
            );
          })}

        {!isRegionView && toshkentShaharItem && (
          <g
            className={`${styles.tashkentCalloutGroup} ${
              selectedRegionId === "toshkent_sh" ? styles.selectedCallout : ""
            }`}
            onClick={() => handleRegionClick(toshkentShaharItem as RegionItem)}
            onMouseEnter={() =>
              setHoveredItem({
                id: toshkentShaharItem.id,
                name: toshkentShaharItem.name,
                count: toshkentShaharItem.count,
                centroid: [717.5, 95],
              })
            }
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Toshkent shahriga ulovchi yo'naltiruvchi chiziq */}
            <line
              x1="696.6"
              y1="275.5"
              x2="717.5"
              y2="160"
              className={styles.calloutPointerLine}
            />
            {/* Asosiy xaritadagi Toshkent shahri markazi */}
            <circle
              cx="696.6"
              cy="275.5"
              r="4.5"
              fill="#1f3e82"
              stroke="#ffffff"
              strokeWidth="2"
            />

            {/* Kattalashtirilgan Toshkent shahri oynasi */}
            <rect
              x="636"
              y="16"
              width="163"
              height="144"
              rx="14"
              className={styles.calloutCard}
            />

            {/* Sarlavha qismi */}
            <rect
              x="636"
              y="16"
              width="163"
              height="28"
              rx="14"
              className={styles.calloutHeader}
            />
            <text
              x="717.5"
              y="35"
              textAnchor="middle"
              className={styles.calloutTitle}
            >
              {toshkentShaharItem.name}
            </text>

            {/* 12 ta tumanning kattalashtirilgan xaritasi */}
            <svg
              x="641"
              y="48"
              width="153"
              height="106"
              viewBox="0 0 650 520"
            >
              {tashkentDistrictsData.map((d) => (
                <path
                  key={d.name}
                  d={d.d}
                  fill={selectedRegionId === "toshkent_sh" ? "#1f3e82" : "#C6C8E1"}
                  stroke="#162c54"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className={styles.calloutDistrictPath}
                >
                  <title>{d.name}</title>
                </path>
              ))}
            </svg>
          </g>
        )}

        {isRegionView &&
          districtsData &&
          districtsData.items.map((dist) => {
            const isSelected = dist.id === selectedDistrictId || dist.name === selectedDistrictId;
            return (
              <path
                key={dist.id}
                d={dist.d}
                fill={isSelected ? "#1f3e82" : "#C6C8E1"}
                stroke="#162c54"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                className={`${styles.regionPath} ${isSelected ? styles.selectedPath : ""}`}
                onClick={() => handleDistrictClick(dist.id, dist.displayName)}
                onMouseEnter={() =>
                  setHoveredItem({
                    id: dist.id,
                    name: dist.displayName,
                    count: dist.count,
                    centroid: dist.centroid,
                  })
                }
                onMouseLeave={() => setHoveredItem(null)}
              >
                <title>{dist.displayName}</title>
              </path>
            );
          })}
      </svg>

      {/* Tooltip pufagi va kursor */}
      {activeTooltip && (
        <div
          className={styles.tooltipBox}
          style={{
            left: `${Math.min(Math.max((activeTooltip.centroid[0] / vbW) * 100, 10), 90)}%`,
            top: `${Math.min(Math.max((activeTooltip.centroid[1] / vbH) * 100, 15), 90)}%`,
          }}
        >
          <div className={styles.tooltipBubble}>
            <span className={styles.tooltipCount}>
              {activeTooltip.count} {t("inspektorlar.inspectorCount", "ta inspektor")}
            </span>
            <span className={styles.tooltipTitle}>{activeTooltip.name}</span>
          </div>
          <BlackCursorSvg />
        </div>
      )}
    </div>
  );
};

export default UzbMap;
