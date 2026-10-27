import { useState, useEffect, useRef, forwardRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Layout/header";
import HTMLFlipBook, { type PageFlipInstance } from "react-pageflip";
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  FileText,
  Check,
  Home,
} from "lucide-react";
import courtGavelImg from "@/assets/global/court_gavel.jpg";
import silkRibbonImg from "@/assets/global/redbooksilk.png";
import cornerOrnamentImg from "@/assets/global/bookcorner.png";
import goldScalesImg from "@/assets/global/booktoptitle.png";
import styles from "./JazoDetail.module.scss";

import type { TFunction } from "i18next";

interface JazoItem {
  id: string;
  code: string;
  name: string;
  fullTitle: string;
  description: string;
  duration: string;
  location: string;
  supervisor: string;
}

const getJazoData = (t: TFunction): JazoItem[] => [
  {
    id: "ati",
    code: t("jazoTurlari.codes.ati", "ATI —"),
    name: t("jazoTurlari.ati", "AXLOQ TUZATISH ISHLARI"),
    fullTitle: t("jazoDetail.ati.title", "ATI — AXLOQ TUZATISH ISHLARI"),
    description: t(
      "jazoDetail.ati.desc",
      "Axloq tuzatish ishlari — bu jazo turi bo'lib, u jinoyat sodir etgan shaxslarni jamiyatda axloqiy me'yorlarga rioya qilishga o'rgatish, ularning ijtimoiy moslashuvini ta'minlash maqsadida qo'llaniladi."
    ),
    duration: t("jazoDetail.ati.duration", "6 oydan 3 yilgacha"),
    location: t("jazoDetail.ati.location", "maxsus muassasalar yoki jamoat joylari"),
    supervisor: t("jazoDetail.ati.supervisor", "probatsiya organlari tomonidan"),
  },
  {
    id: "och",
    code: t("jazoTurlari.codes.och", "OCH —"),
    name: t("jazoTurlari.och", "OZODLIKNI CHEKLASH"),
    fullTitle: t("jazoDetail.och.title", "OCH — OZODLIKNI CHEKLASH"),
    description: t(
      "jazoDetail.och.desc",
      "Ozodlikni cheklash — sud tomonidan mahkumga nisbatan muayyan cheklovlar belgilashdan iborat bo'lib, mahkum yashash joyini tark etmasligi va belgilangan taqiqlarga amal qilishi shart."
    ),
    duration: t("jazoDetail.och.duration", "1 oydan 5 yilgacha"),
    location: t("jazoDetail.och.location", "doimiy yashash joyida (elektron bilaguzuk orqali)"),
    supervisor: t("jazoDetail.och.supervisor", "probatsiya bo'linmalari va profilaktika nozirlari"),
  },
  {
    id: "mji",
    code: t("jazoTurlari.codes.mji", "MJI —"),
    name: t("jazoTurlari.mji", "MAJBURIY JAMOAT ISHLARI"),
    fullTitle: t("jazoDetail.mji.title", "MJI — MAJBURIY JAMOAT ISHLARI"),
    description: t(
      "jazoDetail.mji.desc",
      "Majburiy jamoat ishlari — mahkumni ishdan yoki o'qishdan bo'sh vaqtida haq to'lanmaydigan foydali jamoat ishlarini bajarishga majburiy jalb qilishdan iboratdir."
    ),
    duration: t("jazoDetail.mji.duration", "120 soatdan 480 soatgacha"),
    location: t("jazoDetail.mji.location", "davlat va obodonlashtirish korxonalarida"),
    supervisor: t("jazoDetail.mji.supervisor", "probatsiya xizmati inspektori"),
  },
  {
    id: "mxmq",
    code: t("jazoTurlari.codes.mxmq", "MXMQ —"),
    name: t("jazoTurlari.mxmq", "MUAYYAN HUQUQDAN MAHRUM QILISH"),
    fullTitle: t("jazoDetail.mxmq.title", "MXMQ — MUAYYAN HUQUQDAN MAHRUM QILISH"),
    description: t(
      "jazoDetail.mxmq.desc",
      "Muayyan huquqdan mahrum qilish — aybdor shaxsning ma'lum tashkilotlarda rahbarlik yoki mansabdor lavozimlarni egallashini yoki kasbiy faoliyat bilan shug'ullanishini cheklashdir."
    ),
    duration: t("jazoDetail.mxmq.duration", "1 yildan 5 yilgacha"),
    location: t("jazoDetail.mxmq.location", "barcha tashkilot va muassasalarda"),
    supervisor: t("jazoDetail.mxmq.supervisor", "sud ijrochilari va probatsiya organlari"),
  },
  {
    id: "shs",
    code: t("jazoTurlari.codes.shs", "SHS —"),
    name: t("jazoTurlari.shs", "SHARTLI HUKM QILISH"),
    fullTitle: t("jazoDetail.shs.title", "SHS — SHARTLI HUKM QILISH"),
    description: t(
      "jazoDetail.shs.desc",
      "Shartli hukm qilish — agar sud jazoni o'tamasdan turib ham mahkumni tuzatish mumkin degan xulosaga kelsa, belgilangan sinov muddati davomida uning xulq-atvori nazorat qilinadi."
    ),
    duration: t("jazoDetail.shs.duration", "1 yildan 3 yilgacha sinov muddati"),
    location: t("jazoDetail.shs.location", "yashash va mehnat joyida nazorat ostida"),
    supervisor: t("jazoDetail.shs.supervisor", "probatsiya inspeksiyasi va jamoatchilik"),
  },
  {
    id: "udo",
    code: t("jazoTurlari.codes.udo", "UDO —"),
    name: t("jazoTurlari.udo", "UZOQ MUDDATLI OZOD QILISH"),
    fullTitle: t("jazoDetail.udo.title", "UDO — UZOQ MUDDATLI OZOD QILISH"),
    description: t(
      "jazoDetail.udo.desc",
      "Jazodan muddatidan ilgari shartli ozod qilish — jazoni o'tayotgan shaxs qonunda belgilangan me'yorlarni bajargan va namunali xulq ko'rsatgan taqdirda sud qarori bilan qo'llaniladi."
    ),
    duration: t("jazoDetail.udo.duration", "o'talmagan jazo muddati davomida"),
    location: t("jazoDetail.udo.location", "oila va jamiyat muhitida"),
    supervisor: t("jazoDetail.udo.supervisor", "hududiy probatsiya bo'linmasi"),
  },
];

const playPageFlipSound = () => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const bufferSize = Math.floor(ctx.sampleRate * 0.1);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(650, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.1);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.1);
  } catch (err) {
    void err;
  }
};

interface PageProps {
  children: React.ReactNode;
  className?: string;
  "data-density"?: string;
}

const BookPage = forwardRef<HTMLDivElement, PageProps>(
  ({ children, className, "data-density": density = "soft" }, ref) => {
    return (
      <div ref={ref} className={className} data-density={density}>
        <div className={styles.pageInner}>{children}</div>
      </div>
    );
  },
);
BookPage.displayName = "BookPage";

const JazoDetail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const flipBookRef = useRef<PageFlipInstance>(null);

  const jazoData = getJazoData(t);

  const initialId = searchParams.get("id") || "ati";
  const initialIdx = Math.max(
    0,
    jazoData.findIndex((item) => item.id === initialId),
  );
  const [selectedIndex, setSelectedIndex] = useState(initialIdx);

  useEffect(() => {
    const foundIdx = jazoData.findIndex((item) => item.id === initialId);
    if (foundIdx !== -1 && flipBookRef.current) {
      const api = flipBookRef.current.pageFlip();
      if (api && typeof api.turnToPage === "function") {
        api.turnToPage(foundIdx * 2);
      }
    }
  }, [initialId, jazoData]);

  const handleTurnToSpread = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    playPageFlipSound();
    if (flipBookRef.current) {
      const api = flipBookRef.current.pageFlip();
      if (api) {
        if (typeof api.flip === "function") {
          api.flip(index * 2);
        } else if (typeof api.turnToPage === "function") {
          api.turnToPage(index * 2);
        }
      }
    }
  };

  const handlePrev = () => {
    if (flipBookRef.current) {
      const api = flipBookRef.current.pageFlip();
      if (api && typeof api.flipPrev === "function") {
        playPageFlipSound();
        api.flipPrev();
        return;
      }
    }
    if (selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (flipBookRef.current) {
      const api = flipBookRef.current.pageFlip();
      if (api && typeof api.flipNext === "function") {
        playPageFlipSound();
        api.flipNext();
        return;
      }
    }
    if (selectedIndex < jazoData.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.container}>
      <Header
        title={t("jazoTurlari.title", "JAZO TURLARI HAQIDA")}
        onBack={() => navigate("/jazo-turlari")}
      />

      <main className={styles.bookViewport}>
        <div className={styles.bookOuterFrame}>
          <HTMLFlipBook
            width={560}
            height={560}
            size="stretch"
            minWidth={360}
            maxWidth={620}
            minHeight={440}
            maxHeight={640}
            maxShadowOpacity={0.4}
            showCover={false}
            mobileScrollSupport={true}
            usePortrait={false}
            startPage={initialIdx * 2}
            drawShadow={true}
            flippingTime={700}
            useMouseEvents={true}
            clickEventForward={true}
            showPageCorners={true}
            disableFlipByClick={false}
            className={styles.flipBookContainer}
            ref={flipBookRef}
            renderOnlyPageLengthChange={true}
            onFlip={(e) => {
              const spread = Math.floor(e.data / 2);
              if (spread >= 0 && spread < jazoData.length) {
                setSelectedIndex(spread);
                playPageFlipSound();
              }
            }}
          >
            {jazoData.flatMap((item, spreadIdx) => [
              <BookPage
                key={`left-${item.id}`}
                className={styles.leftPage}
                data-density="soft"
              >
                <img
                  src={cornerOrnamentImg}
                  alt=""
                  className={styles.cornerTL}
                />
                <img
                  src={cornerOrnamentImg}
                  alt=""
                  className={styles.cornerBL}
                />

                <div className={styles.pageHeader}>
                  <div className={styles.scalesHeaderRow}>
                    <span className={styles.scalesLine} />
                    <img
                      src={goldScalesImg}
                      alt="Adolat tarozisi"
                      className={styles.topScalesImg}
                    />
                    <span className={styles.scalesLine} />
                  </div>
                  <h2 className={styles.pageTitle}>JAZO TURLARI HAQIDA</h2>
                </div>

                <div className={styles.itemsList}>
                  {jazoData.map((listItem, listIdx) => {
                    const isActive = listIdx === spreadIdx;
                    return (
                      <button
                        type="button"
                        key={listItem.id}
                        className={`${styles.itemCard} ${
                          isActive ? styles.activeItem : ""
                        }`}
                        onClick={() => handleTurnToSpread(listIdx)}
                      >
                        {isActive && (
                          <img
                            src={silkRibbonImg}
                            alt="Xatcho'p"
                            className={styles.silkRibbon}
                          />
                        )}

                        <div className={styles.itemLeft}>
                          <div className={styles.bookIconBadge}>
                            <BookOpen size={18} strokeWidth={2.4} />
                          </div>
                          <div className={styles.itemText}>
                            <span className={styles.itemCode}>
                              {listItem.code}
                            </span>
                            <span className={styles.itemName}>
                              {listItem.name}
                            </span>
                          </div>
                        </div>

                        <ChevronRight size={18} className={styles.itemArrow} />
                      </button>
                    );
                  })}
                </div>
              </BookPage>,

              <BookPage
                key={`right-${item.id}`}
                className={styles.rightPage}
                data-density="soft"
              >
                <img
                  src={cornerOrnamentImg}
                  alt=""
                  className={styles.cornerTR}
                />
                <img
                  src={cornerOrnamentImg}
                  alt=""
                  className={styles.cornerBR}
                />

                <div className={styles.articleTitleRow}>
                  <BookOpen
                    size={22}
                    className={styles.articleBookIcon}
                    strokeWidth={2.4}
                  />
                  <h2 className={styles.articleTitle}>{item.fullTitle}</h2>
                </div>

                <div className={styles.titleOrnamentRow}>
                  <span className={styles.ornamentLine} />
                  <span className={styles.goldFlourish}>❖</span>
                  <span className={styles.ornamentLine} />
                </div>

                <div className={styles.illustrationWrapper}>
                  <img
                    src={courtGavelImg}
                    alt="Sud bolg'achasi va tarozi"
                    className={styles.illustration}
                  />
                </div>

                <p className={styles.articleBody}>{item.description}</p>

                <div className={styles.infoHighlightCard}>
                  <div className={styles.highlightHeading}>
                    <FileText size={16} />
                    <span>{t("jazoDetail.mainInfo", "Asosiy ma'lumotlar")}</span>
                  </div>
                  <ul className={styles.highlightList}>
                    <li>
                      <Check
                        size={15}
                        className={styles.checkIcon}
                        strokeWidth={3}
                      />
                      <span>{t("jazoDetail.durationPrefix", "Muddati: ")}{item.duration}</span>
                    </li>
                    <li>
                      <Check
                        size={15}
                        className={styles.checkIcon}
                        strokeWidth={3}
                      />
                      <span>{t("jazoDetail.locationPrefix", "Joyi: ")}{item.location}</span>
                    </li>
                    <li>
                      <Check
                        size={15}
                        className={styles.checkIcon}
                        strokeWidth={3}
                      />
                      <span>{t("jazoDetail.supervisorPrefix", "Nazorat: ")}{item.supervisor}</span>
                    </li>
                  </ul>
                </div>

                <div className={styles.pageNumberBadge}>
                  {spreadIdx + 1} / {jazoData.length}
                </div>
              </BookPage>,
            ])}
          </HTMLFlipBook>

          {selectedIndex < jazoData.length - 1 && (
            <button
              className={styles.floatingNextBtn}
              onClick={handleNext}
              aria-label="Keyingi sahifa"
            >
              <ChevronRight size={24} strokeWidth={2.6} />
            </button>
          )}
        </div>
      </main>

      <footer className={styles.bottomToolbar}>
        <button
          className={styles.contentsBtn}
          onClick={() => navigate("/jazo-turlari")}
        >
          <BookOpen size={16} />
          <span>Мазмун</span>
        </button>

        <div className={styles.pagerControls}>
          <button
            className={styles.pagerArrow}
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            aria-label="Oldingi sahifa"
          >
            <ChevronLeft size={18} strokeWidth={2.6} />
          </button>

          <span className={styles.pagerStatus}>
            {selectedIndex + 1} / {jazoData.length}
          </span>

          <button
            className={styles.pagerArrow}
            onClick={handleNext}
            disabled={selectedIndex === jazoData.length - 1}
            aria-label="Keyingi sahifa"
          >
            <ChevronRight size={18} strokeWidth={2.6} />
          </button>
        </div>

        <button
          className={styles.homePillBtn}
          onClick={() => navigate("/dashboard")}
        >
          <Home size={16} />
          <span>Бош саҳифа</span>
        </button>
      </footer>
    </div>
  );
};

export default JazoDetail;
