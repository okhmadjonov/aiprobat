import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Layout/header";
import styles from "./JazoTurlari.module.scss";

const JazoTurlari = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isRu = (i18n.language || "uz").toLowerCase().startsWith("ru");

  const jazoItems = [
    { id: "ati", code: isRu ? "ИТР —" : "ATI —", name: t("jazoTurlari.ati", "AXLOQ TUZATISH ISHLARI") },
    { id: "och", code: isRu ? "ОС —" : "OCH —", name: t("jazoTurlari.och", "OZODLIKNI CHEKLASH") },
    { id: "mji", code: isRu ? "ООР —" : "MJI —", name: t("jazoTurlari.mji", "MAJBURIY JAMOAT ISHLARI") },
    { id: "mxmq", code: isRu ? "ЛОП —" : "MXMQ —", name: t("jazoTurlari.mxmq", "MUAYYAN HUQUQDAN MAHRUM QILISH") },
    { id: "shs", code: isRu ? "УО —" : "SHS —", name: t("jazoTurlari.shs", "SHARTLI HUKM QILISH") },
    { id: "udo", code: isRu ? "УДО —" : "UDO —", name: t("jazoTurlari.udo", "UZOQ MUDDATLI OZOD QILISH") },
  ];

  return (
    <div className={styles.container}>
      <Header title={t("jazoTurlari.title", "JAZO TURLARI HAQIDA")} />

      <main className={styles.mainWrapper}>
        <div className={styles.whiteCard}>
          {jazoItems.map((item) => (
            <div
              key={item.id}
              className={styles.itemCard}
              onClick={() => navigate(`/jazo-turlari/batafsil?id=${item.id}`)}
            >
              <div className={styles.itemText}>
                <span className={styles.goldCode}>{item.code}</span>
                <span className={styles.navyName}>{item.name}</span>
              </div>
              <div className={styles.arrowCircle}>
                <ArrowRight size={18} strokeWidth={2.6} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JazoTurlari;
