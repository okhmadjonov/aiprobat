import React from "react";
import { Outlet } from "react-router-dom";
import Header, { type HeaderProps } from "./header";
// import Sidebar, { type SidebarProps, type MenuItem } from "./sidebar";
import styles from "./Layout.module.scss";

export interface LayoutProps {
  children?: React.ReactNode;
  
  showHeader?: boolean;
  title?: string;
  titleKey?: string;
  titleExtra?: React.ReactNode;
  onBack?: () => void;
  backPath?: string;
  showBack?: boolean;
  showHome?: boolean;
  showLang?: boolean;
  headerProps?: Partial<HeaderProps>;

  showSidebar?: boolean;
  sidebarActiveTitle?: string;
  onSidebarActiveTitleClick?: () => void;
  // sidebarItems?: MenuItem[];
  sidebarActiveId?: string;
  onSidebarItemClick?: (id: string) => void;
  // sidebarProps?: Partial<SidebarProps>;

  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  title,
  titleKey,
  titleExtra,
  onBack,
  backPath,
  showBack = true,
  showHome = true,
  showLang = true,
  headerProps,

  showSidebar = false,
  // sidebarActiveTitle,
  // onSidebarActiveTitleClick,
  // sidebarItems,
  // sidebarActiveId,
  // onSidebarItemClick,
  // sidebarProps,

  className = "",
  contentClassName = "",
  style,
}) => {
  const shouldRenderHeader = showSidebar && showHeader === undefined ? false : showHeader;

  const mergedHeaderProps: HeaderProps = {
    title,
    titleKey,
    titleExtra,
    onBack,
    backPath,
    showBack,
    showHome,
    showLang,
    ...headerProps,
  };

  // const mergedSidebarProps: SidebarProps = {
  //   activeTitle: sidebarActiveTitle,
  //   onActiveTitleClick: onSidebarActiveTitleClick,
  //   // items: sidebarItems,
  //   activeId: sidebarActiveId,
  //   onItemClick: onSidebarItemClick,
  //   onBack,
  //   backPath,
  //   // ...sidebarProps,
  // };

  return (
    <div
      className={`${styles.layoutContainer} ${
        showSidebar ? styles.directionRow : styles.directionColumn
      } ${className}`.trim()}
      style={style}
    >
      {/* {showSidebar && <Sidebar {...mergedSidebarProps} />} */}

      <div className={styles.mainArea}>
        {shouldRenderHeader && <Header {...mergedHeaderProps} />}

        <div className={`${styles.contentArea} ${contentClassName}`.trim()}>
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Layout;

export { default as Header, LiveClock } from "./header";
export type { HeaderProps } from "./header";
// export { default as Sidebar } from "./sidebar";
// export type { SidebarProps, MenuItem } from "./sidebar";
