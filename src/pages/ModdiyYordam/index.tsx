import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/header";
import styles from "./ModdiyYordam.module.scss";

const InfoSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="2" fill="white" />
    <path
      d="M10 11H12V18M12 18H14M12 18H10"
      stroke="white"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HierarchySvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="3" width="8" height="6" rx="1.2" fill="white" />
    <path
      d="M12 9V14M12 14H5V17M12 14H19V17"
      stroke="white"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="2" y="17" width="6" height="5" rx="1.2" fill="white" />
    <rect x="16" y="17" width="6" height="5" rx="1.2" fill="white" />
  </svg>
);

const DocumentSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 3H14L19 8V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V4C5 3.4 5.4 3 6 3Z"
      stroke="white"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path d="M14 3V8H19" stroke="white" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M9 12H15M9 16H13" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const PencilSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.5 3.5L20.5 7.5L7 21H3V17L16.5 3.5Z"
      stroke="white"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M13.5 6.5L17.5 10.5" stroke="white" strokeWidth="2.4" />
  </svg>
);

const QuestionSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.5 9C9.5 7.6 10.6 6.4 12 6.4C13.4 6.4 14.5 7.6 14.5 9C14.5 10.8 12 11.5 12 13.5"
      stroke="white"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="17.5" r="1.6" fill="white" />
  </svg>
);

const ArrowRightSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="white"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface TopicDetail {
  id: string;
  title: string;
  body: string;
  actionText?: string;
}

const topicDetails: Record<string, TopicDetail> = {
  what: {
    id: "what",
    title: "Bir martalik moddiy yordam nima?",
    body: `Bir martalik moddiy yordam — bu sud hukmi bilan ozodlikdan mahrum etish bilan bog'liq bo'lmagan jazolarga hukm qilingan yoki jazoni o'tab qaytgan, ijtimoiy himoyaga muhtoj fuqarolarning hayotiy sharoitlarini yaxshilash va ularni jamiyatga moslashtirish maqsadida davlat tomonidan qaytarib olinmaslik sharti bilan ajratiladigan bir martalik pul mablag'idir.

Mablag' miqdori Vazirlar Mahkamasining tegishli qarorlariga asosan bazaviy hisoblash miqdori (BHM) doirasida belgilanadi.`,
  },
  flow: {
    id: "flow",
    title: "Moddiy yordam ajratish ketma-ketligi (sxema)",
    body: `1. Murojaat: Fuqaro o'zi yashab turgan hududdagi probatsiya bo'linmasi inspektoriga yoki 'Inson' ijtimoiy xizmatlar markaziga ariza bilan murojaat qiladi.
2. O'rganish: Mahalla fuqarolar yig'ini faollari va inspektor ishtirokida fuqaroning yashash va moddiy sharoiti 3 ish kuni ichida joyiga chiqqan holda o'rganiladi va dalolatnoma tuziladi.
3. Xulosa: Tuman (shahar) komissiyasi tomonidan hujjatlar 7 ish kuni ichida ko'rib chiqilib, yordam ajratish yoki rad etish haqida qaror qabul qilinadi.
4. To'lov: Ijobiy qaror qabul qilingach, mablag'lar 5 bank kuni ichida fuqaroning bank plastik kartasiga yoki Xalq banki orqali to'lab beriladi.`,
  },
  docs: {
    id: "docs",
    title: "Kerakli hujjatlar ro'yxati",
    body: `Moddiy yordam olish uchun quyidagi hujjatlar taqdim etiladi:
• Shaxsni tasdiqlovchi hujjat (fuqarolik pasporti yoki ID-karta);
• Tuman probatsiya bo'limi boshlig'i nomiga yozilgan ariza;
• Yashash joyidan oila a'zolari va daromadlari to'g'risida ma'lumot (elektron tizim orqali olinishi ham mumkin);
• Fuqaroning nomiga ochilgan bank kartasi rekviziti (20 talik hisobraqam).`,
  },
  sample: {
    id: "sample",
    title: "Ariza namunasi",
    body: `                                                        Tuman (shahar) probatsiya bo'limi boshlig'iga
                                                        Manzil: _______________________________
                                                        Fuqaro: _______________________________
                                                        Telefon: ______________________________

                                              ARIZA

  Men, ______________________________________________________________________,
  hozirgi kunda oilaviy va moddiy jihatdan og'ir ahvolda qolganligim sababli,
  amaldagi qonunchilik hujjatlariga asosan menga bir martalik moddiy yordam
  ajratishingizni so'rayman.

  Haqiqatan ham moddiy yordamga muhtojligimni tasdiqlovchi hujjatlarni ilova qilaman.

  Sana: ____.____.2026-yil                                   Imzo: _______________`,
    actionText: "Arizani yuklab olish (TXT)",
  },
  faq: {
    id: "faq",
    title: "Ko'p beriladigan savollar",
    body: `1-savol: Moddiy yordam pulini keyinchalik davlatga qaytarish kerakmi?
Javob: Yo'q, ushbu yordam qaytarilmaydigan bir martalik ijtimoiy ko'mak hisoblanadi.

2-savol: Ariza ko'rib chiqilishi uchun qancha vaqt ketadi?
Javob: Ariza topshirilgan kundan boshlab to'liq o'rganish va qaror qabul qilish jarayoni ko'pi bilan 10-15 ish kunini tashkil qiladi.

3-savol: Kimlarga moddiy yordam berilishi rad etilishi mumkin?
Javob: Doimiy yetarli daromadga ega bo'lgan yoki noto'g'ri (soxta) ma'lumotlar taqdim etilgan holatlarda rad etiladi.`,
  },
};

const ModdiyYordam = () => {
  const { t } = useTranslation();
  const [selectedTopic, setSelectedTopic] = useState<TopicDetail | null>(null);

  const helpTopics = [
    {
      id: "what",
      title: t("moddiyYordam.what", "Moddiy yordam nima ?"),
      icon: <InfoSvg />,
    },
    {
      id: "flow",
      title: t("moddiyYordam.flow", "Ajratish ketma-ketligi (sxema)"),
      icon: <HierarchySvg />,
    },
    {
      id: "docs",
      title: t("moddiyYordam.docs", "Kerakli hujjatlar ro'yxati"),
      icon: <DocumentSvg />,
    },
    {
      id: "sample",
      title: t("moddiyYordam.sample", "Ariza namunasi"),
      icon: <PencilSvg />,
    },
    {
      id: "faq",
      title: t("moddiyYordam.faq", "Ko'p beriladigan savollar"),
      icon: <QuestionSvg />,
    },
  ];

  const handleOpenTopic = (id: string) => {
    setSelectedTopic(topicDetails[id] || topicDetails.what);
  };

  const handleDownloadSample = () => {
    if (!selectedTopic) return;
    const blob = new Blob([selectedTopic.body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ariza_namunasi.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <Header title={t("moddiyYordam.title", "BIR MARTALIK MODDIY YORDAM HAQIDA")} />

      <main className={styles.mainWrapper}>
        <div className={styles.whiteCard}>
          {helpTopics.map((topic) => (
            <button
              type="button"
              key={topic.id}
              className={styles.itemCard}
              onClick={() => handleOpenTopic(topic.id)}
            >
              <div className={styles.leftSide}>
                <div className={styles.circleIcon}>{topic.icon}</div>
                <span className={styles.itemTitle}>{topic.title}</span>
              </div>
              <div className={styles.arrowCircle}>
                <ArrowRightSvg />
              </div>
            </button>
          ))}
        </div>
      </main>

      {selectedTopic && (
        <div className={styles.modalOverlay} onClick={() => setSelectedTopic(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalDocTitle}>{selectedTopic.title}</h2>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setSelectedTopic(null)}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div style={{ whiteSpace: "pre-line" }}>{selectedTopic.body}</div>
            </div>
            <div className={styles.modalFooter}>
              {selectedTopic.actionText && (
                <button
                  type="button"
                  className={`${styles.modalActionBtn} ${styles.modalPrimaryBtn}`}
                  onClick={handleDownloadSample}
                >
                  {selectedTopic.actionText}
                </button>
              )}
              <button
                type="button"
                className={`${styles.modalActionBtn} ${styles.modalSecondaryBtn}`}
                onClick={() => setSelectedTopic(null)}
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModdiyYordam;
