import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Loader.module.scss";

function Loader() {
  const { t } = useTranslation();

  return (
    <div className={styles.spinner}>
      <div className={styles.loaderContent}>
        <div className={styles.customLoader}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className={styles.loaderText}>
          {t("loader.text", "Yuklanmoqda")}
        </p>
      </div>
    </div>
  );
}

export default React.memo(Loader);