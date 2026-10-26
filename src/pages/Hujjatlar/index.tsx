import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/header";
import styles from "./Hujjatlar.module.scss";

const OpenBookSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 5C2 4.4 2.4 4 3 4C6.5 4 10 5.5 12 7C14 5.5 17.5 4 21 4C21.6 4 22 4.4 22 5V18C22 18.6 21.6 19 21 19C17.5 19 14 20.5 12 22C10 20.5 6.5 19 3 19C2.4 19 2 18.6 2 18V5Z"
      stroke="white"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M12 7V22" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const DocumentSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 3H14L19 8V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V4C5 3.4 5.4 3 6 3Z"
      stroke="white"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M14 3V8H19" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M9 12H15M9 16H13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const LandmarkSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 21H21M4 18H20M5 10V18M9 10V18M15 10V18M19 10V18"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path d="M12 3L2 9H22L12 3Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
);

const ListItemsSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="7" r="1.5" fill="white" />
    <circle cx="5" cy="12" r="1.5" fill="white" />
    <circle cx="5" cy="17" r="1.5" fill="white" />
    <path d="M9 7H19M9 12H19M9 17H19" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const AudioSpeakerSvg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2.4" strokeLinejoin="round" />
    <path
      d="M15.54 8.46C16.48 9.4 17 10.66 17 12C17 13.34 16.48 14.6 15.54 15.54M19.07 4.93C20.94 6.8 22 9.35 22 12C22 14.65 20.94 17.2 19.07 19.07"
      stroke="white"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowRightSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="white"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface DocDetail {
  id: string;
  category: string;
  title: string;
  number: string;
  date: string;
  content: string;
}

const docsDatabase: Record<string, DocDetail> = {
  qonunlar: {
    id: "qonunlar",
    category: "Qonun",
    title: "O'zbekiston Respublikasining 'Probatsiya to'g'risida'gi Qonuni",
    number: "O'RQ-883-son",
    date: "2023-yil 14-noyabr",
    content: `1-modda. Ushbu Qonunning maqsadi va vazifalari
Ushbu Qonunning asosiy maqsadi probatsiya sohasidagi munosabatlarni tartibga solish, ozodlikdan mahrum qilish bilan bog'liq bo'lmagan jazolarga hukm qilingan shaxslarning xulq-atvori ustidan ta'sirchan nazoratni ta'minlash hamda ularning ijtimoiy reabilitatsiyasini amalga oshirishdan iborat.

2-modda. Probatsiya nazoratidagi shaxslarning huquq va majburiyatlari
Probatsiya nazorati ostidagi shaxslar o'z huquqlari to'g'risida to'liq axborot olish, tibbiy, psixologik va ijtimoiy yordamdan foydalanish huquqiga ega. Shu bilan birga, ular sud tomonidan yuklangan majburiyatlarni to'liq bajarishi, probatsiya organiga belgilangan vaqtlarda ro'yxatdan o'tish uchun kelishi shart.`,
  },
  farmonlar: {
    id: "farmonlar",
    category: "Prezident Farmoni",
    title: "Ozodlikdan mahrum etish bilan bog'liq bo'lmagan jazolarning ijrosini ta'minlash tizimini takomillashtirish to'g'risida",
    number: "PF-5580-son",
    date: "2018-yil 7-noyabr",
    content: `O'zbekiston Respublikasi Prezidentining Farmoni bilan O'zbekiston Respublikasi IIV Jazoni ijro etish bosh boshqarmasi huzurida Probatsiya xizmati tashkil etilgan.

Asosiy vazifalar etib quyidagilar belgilangan:
1. Mahkumlarning qayta jinoyat sodir etishining oldini olish va profilaktik nazoratni kuchaytirish;
2. Elektron bilaguzuklar va raqamli monitoring vositalaridan keng foydalanish;
3. Mahkumlarni kasb-hunarga o'rgatish va bandligini ta'minlash orqali jamiyatga sog'lom integratsiyalashuviga ko'maklashish.`,
  },
  qarorlar: {
    id: "qarorlar",
    category: "Vazirlar Mahkamasi Qarori",
    title: "Probatsiya nazoratidagi shaxslarni ijtimoiy moslashtirish chora-tadbirlari to'g'risida",
    number: "VMQ-745-son",
    date: "2021-yil 16-sentyabr",
    content: `Mazkur qaror bilan jazoni o'tab qaytgan va probatsiya hisobida turgan fuqarolarga bir martalik moddiy yordam ajratish, ularni bepul kasbiy ta'lim bilan qamrab olish va imtiyozli subsidiyalar ajratish tartibi belgilangan.

Ijtimoiy yordam ko'rsatish tuman (shahar) hokimliklari va 'Inson' ijtimoiy xizmatlar markazlari bilan hamkorlikda amalga oshiriladi.`,
  },
  iiv: {
    id: "iiv",
    category: "IIV Buyrug'i",
    title: "Probatsiya bo'linmalari xodimlarining faoliyatini tashkil etish to'g'risida yo'riqnoma",
    number: "231-sonli buyruq",
    date: "2022-yil 24-fevral",
    content: `IIV Probatsiya xizmati inspektorlarining kundalik xizmat vazifalari, mahkumlar bilan individual suhbatlar o'tkazish, elektron bilaguzuk signallarini nazorat qilish va yashash joyi bo'yicha tungi tekshiruvlarni amalga oshirish tartibi ushbu buyruq bilan belgilanadi.`,
  },
  nizomlar: {
    id: "nizomlar",
    category: "Nizom",
    title: "Axloq tuzatish ishlari va majburiy jamoat ishlarini ijro etish Nizomi",
    number: "Adliya vazirligi №3124",
    date: "2020-yil 12-may",
    content: `Nizomga muvofiq, axloq tuzatish ishlari jazosiga hukm qilingan shaxslarning ish haqidan ushlab qolinadigan mablag'lar har oyda davlat daromadiga o'tkaziladi. Ish beruvchi mahkumning ish joyini probatsiya organining ruxsatisiz o'zgartirishga haqli emas.`,
  },
  boshqa: {
    id: "boshqa",
    category: "Qoidalar",
    title: "Probatsiya nazoratidagi shaxslarga nisbatan elektron bilaguzuklarni qo'llash qoidalari",
    number: "19-sonli idoralararo qaror",
    date: "2023-yil 5-aprel",
    content: `Ozodlikni cheklash jazosi tayinlangan shaxslarga yashash hududini tark etmaslikni nazorat qilish maqsadida elektron bilaguzuk taqiladi. Qurilmani qasddan buzish yoki yechish qat'iy javobgarlikka sabab bo'ladi va jazoni yanada og'irroq turiga almashtirishga asos bo'ladi.`,
  },
};

const Hujjatlar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedDoc, setSelectedDoc] = useState<DocDetail | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const documentItems = [
    { id: "qonunlar", title: t("hujjatlar.qonunlar", "Qonunlar"), icon: <OpenBookSvg /> },
    { id: "farmonlar", title: t("hujjatlar.farmonlar", "Prezident farmonlari"), icon: <DocumentSvg /> },
    {
      id: "qarorlar",
      title: t("hujjatlar.qarorlar", "Vazirlar Mahkamasi qarorlari"),
      icon: <LandmarkSvg />,
    },
    { id: "iiv", title: t("hujjatlar.iiv", "IIV buyruqlari"), icon: <OpenBookSvg /> },
    {
      id: "nizomlar",
      title: t("hujjatlar.nizomlar", "Nizomlar va yo'riqnomalar"),
      icon: <ListItemsSvg />,
    },
    { id: "boshqa", title: t("hujjatlar.boshqa", "Boshqa hujjatlar"), icon: <DocumentSvg /> },
  ];

  const handleOpenDoc = (id: string) => {
    const doc = docsDatabase[id] || docsDatabase.qonunlar;
    setSelectedDoc(doc);
  };

  const handleToggleAudio = () => {
    if (!("speechSynthesis" in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = selectedDoc
      ? `${selectedDoc.title}. ${selectedDoc.content}`
      : `${docsDatabase.qonunlar.title}. ${docsDatabase.qonunlar.content}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "uz-UZ";
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handleDownloadDoc = () => {
    const doc = selectedDoc || docsDatabase.qonunlar;
    const fileContent = `${doc.title}\n${doc.number} | ${doc.date}\n\n${doc.content}`;
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.id}_hujjat.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <Header title={t("hujjatlar.title", "ME'YORIY –HUQUQIY HUJJATLAR")} />

      <main className={styles.mainWrapper}>
        <div className={styles.whiteCard}>
          <div className={styles.docsList}>
            {documentItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className={styles.docCard}
                onClick={() => handleOpenDoc(item.id)}
              >
                <div className={styles.docLeft}>
                  <div className={styles.docIconBadge}>{item.icon}</div>
                  <span className={styles.docTitle}>{item.title}</span>
                </div>
                <div className={styles.arrowCircle}>
                  <ArrowRightSvg />
                </div>
              </button>
            ))}
          </div>

          <div className={styles.bottomActionsRow}>
            <button
              type="button"
              className={styles.actionBigBtn}
              onClick={handleToggleAudio}
            >
              <AudioSpeakerSvg />
              <span>
                {isPlayingAudio
                  ? "Audioni to'xtatish"
                  : t("hujjatlar.audio", "Audio shaklda eshitish")}
              </span>
            </button>

            <button
              type="button"
              className={styles.actionBigBtn}
              onClick={() => navigate("/jazo-turlari/batafsil")}
            >
              <OpenBookSvg />
              <span>{t("hujjatlar.ebook", "Elektron kitob shaklda o'qish")}</span>
            </button>
          </div>
        </div>
      </main>

      {selectedDoc && (
        <div className={styles.modalOverlay} onClick={() => setSelectedDoc(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalDocTitle}>{selectedDoc.title}</h2>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setSelectedDoc(null)}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.docMeta}>
                Hujjat turi: {selectedDoc.category} | Raqami: {selectedDoc.number} | Qabul qilingan: {selectedDoc.date}
              </div>
              <div style={{ whiteSpace: "pre-line" }}>{selectedDoc.content}</div>
            </div>
            <div className={styles.modalFooter}>
              <button
                type="button"
                className={`${styles.modalActionBtn} ${styles.modalSecondaryBtn}`}
                onClick={handleDownloadDoc}
              >
                Yuklab olish (TXT)
              </button>
              <button
                type="button"
                className={`${styles.modalActionBtn} ${styles.modalPrimaryBtn}`}
                onClick={handleToggleAudio}
              >
                {isPlayingAudio ? "Audioni to'xtatish" : "Audio eshitish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hujjatlar;
