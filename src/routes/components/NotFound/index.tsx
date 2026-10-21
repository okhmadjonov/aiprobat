import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoAlertCircleOutline } from "react-icons/io5";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.glow} />
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <IoAlertCircleOutline className={styles.icon} />
          <div className={styles.iconPulse} />
        </div>
        <h1 className={styles.title}>{t("notFound.title", "404 - Sahifa Topilmadi")}</h1>
        <p className={styles.description}>
          {t(
            "notFound.description",
            "Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga o'chirilgan."
          )}
        </p>
        <button className={styles.button} onClick={() => navigate("/dashboard")}>
          <span>{t("notFound.backBtn", "Bosh sahifaga qaytish")}</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
