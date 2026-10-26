// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { ArrowLeft, Home } from "lucide-react";
// import styles from "./Sidebar.module.scss";

// export interface MenuItem {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   path?: string;
//   onClick?: () => void;
// }

// export interface SidebarProps {
//   activeTitle?: string;
//   onActiveTitleClick?: () => void;
//   items?: MenuItem[];
//   activeId?: string;
//   onItemClick?: (id: string) => void;
//   onBack?: () => void;
//   backPath?: string;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   activeTitle,
//   onActiveTitleClick,
//   items = [],
//   activeId,
//   onItemClick,
//   onBack,
//   backPath = "/dashboard",
// }) => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const handleBack = () => {
//     if (onBack) {
//       onBack();
//     } else {
//       navigate(backPath);
//     }
//   };

//   const resolvedTitle = activeTitle || t("inspektorlar.title", "Probatsiya inspektorlari haqida");

//   return (
//     <aside className={styles.sidebar}>
//       <div className={styles.sidebarTop}>
//         <button
//           className={styles.backBtn}
//           onClick={handleBack}
//           aria-label={t("common.back", "Orqaga")}
//         >
//           <span>{t("common.back", "Назад")}</span>
//           <div className={styles.backArrowCircle}>
//             <ArrowLeft size={16} strokeWidth={3} />
//           </div>
//         </button>

//         {resolvedTitle && (
//           <div
//             className={styles.activeSectionCard}
//             onClick={onActiveTitleClick}
//           >
//             {resolvedTitle}
//           </div>
//         )}

//         {items.length > 0 && (
//           <div className={styles.menuList}>
//             {items.map((item) => {
//               const isActive = activeId === item.id;
//               return (
//                 <button
//                   type="button"
//                   key={item.id}
//                   className={`${styles.menuItem} ${
//                     isActive ? styles.activeItem : ""
//                   }`}
//                   onClick={() => {
//                     if (item.onClick) item.onClick();
//                     if (onItemClick) onItemClick(item.id);
//                     if (item.path) navigate(item.path);
//                   }}
//                 >
//                   <div className={styles.menuIcon}>{item.icon}</div>
//                   <span>{item.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       <button
//         type="button"
//         className={styles.homeCircleBtn}
//         onClick={() => navigate("/dashboard")}
//         aria-label="Bosh sahifa"
//       >
//         <Home size={22} strokeWidth={2.4} />
//       </button>
//     </aside>
//   );
// };

// export default Sidebar;
