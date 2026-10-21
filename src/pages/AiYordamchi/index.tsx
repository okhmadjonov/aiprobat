import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Home, Mic, Send } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import airobotImg from "@/assets/global/airobot.png";
import styles from "./AiYordamchi.module.scss";

// Headerdagi oq chaqnoq yulduzchalar (✦ ✦)
const SparklesSvg = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.sparklesSvg}
  >
    <path
      d="M10 2L11.5 7.5L17 9L11.5 10.5L10 16L8.5 10.5L3 9L8.5 7.5L10 2Z"
      fill="white"
    />
    <path
      d="M18 14L19 17L22 18L19 19L18 22L17 19L14 18L17 17L18 14Z"
      fill="white"
    />
  </svg>
);

// Savol qatoridagi o'ngga strelka ikonkasi
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

// Mustaqil soat komponenti
const LiveClock = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      setDateTime(`${hours}:${minutes} ${day}.${month}.${year}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span className={styles.clockText}>{dateTime || "09:30 10.10.2026"}</span>;
};

const AiYordamchi = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [question, setQuestion] = useState("");

  // 6.JPG rasmidagi 4 ta misol savol
  const sampleQuestions = [
    t("aiYordamchi.q1", "Probatsiya nima?"),
    t("aiYordamchi.q2", "Axloq tuzatish ishlari qanday jazo ?"),
    t("aiYordamchi.q3", "Moddiy yordam qanday olinadi ?"),
    t("aiYordamchi.q4", "Inspektorlar bilan qanday bog'lanish mumkin ?"),
  ];

  const handleSelectSample = (sample: string) => {
    setQuestion(sample);
  };

  const handleSend = () => {
    if (!question.trim()) return;
    // Kelgusida AI javobini generatsiya qilish
    setQuestion("");
  };

  return (
    <div className={styles.container}>
      {/* 6.JPG Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/dashboard")}
            aria-label={t("common.back", "Orqaga")}
          >
            <span>{t("common.back", "Назад")}</span>
            <div className={styles.backArrowCircle}>
              <ArrowLeft size={16} strokeWidth={3} />
            </div>
          </button>

          <div className={styles.titleWrapper}>
            <h1 className={styles.headerTitle}>{t("aiYordamchi.title", "AI YORDAMCHI")}</h1>
            <SparklesSvg />
          </div>
        </div>

        <div className={styles.headerRight}>
          <LiveClock />
          <button
            className={styles.topHomeBtn}
            onClick={() => navigate("/dashboard")}
            aria-label={t("common.home", "Bosh sahifa")}
          >
            <Home size={20} strokeWidth={2.4} />
          </button>
          <LanguageSwitcher />
        </div>
      </header>

      {/* 6.JPG Asosiy oq karta */}
      <main className={styles.mainWrapper}>
        <div className={styles.whiteCard}>
          <div className={styles.topSection}>
            {/* Chap tomondagi matn va misol savollar */}
            <div className={styles.leftColumn}>
              <h2 className={styles.promptText}>
                {t("aiYordamchi.prompt", "Probatsiyaga oid savollaringizni yozing yoki ovozli so'rashingiz mumkin.")}
              </h2>

              <span className={styles.misolSavollarTitle}>{t("aiYordamchi.sampleTitle", "MISOL SAVOLLAR")}</span>

              <div className={styles.questionsList}>
                {sampleQuestions.map((text, idx) => (
                  <button
                    type="button"
                    key={idx}
                    className={styles.questionItem}
                    onClick={() => handleSelectSample(text)}
                  >
                    <div className={styles.questionLeft}>
                      <div className={styles.questionCircle}>?</div>
                      <span className={styles.questionText}>{text}</span>
                    </div>
                    <div className={styles.arrowRightCircle}>
                      <ArrowRightSvg />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* O'ng tomondagi 3D robot va fikrlash pufakchalari */}
            <div className={styles.robotColumn}>
              <div className={styles.speechDots}>
                <span className={styles.dot1} />
                <span className={styles.dot2} />
                <span className={styles.dot3} />
              </div>

              <img
                src={airobotImg}
                alt="AI Probatsiya Roboti"
                className={styles.robotImg}
              />
            </div>
          </div>

          {/* Pastdagi savol yozish inputi */}
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.textInput}
              placeholder={t("aiYordamchi.placeholder", "Savolingizni yozing ...")}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            <div className={styles.inputActions}>
              <button
                type="button"
                className={styles.micBtn}
                aria-label={t("aiYordamchi.listening", "Ovozli kiritish")}
              >
                <Mic size={22} strokeWidth={2.4} />
              </button>
              <button
                type="button"
                className={styles.sendBtn}
                onClick={handleSend}
                aria-label={t("aiYordamchi.send", "Yuborish")}
              >
                <Send size={22} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>

        {/* 6.JPG dagi pastki chap burchakdagi tashqi Uy tugmasi */}
        <button
          className={styles.bottomLeftHomeBtn}
          onClick={() => navigate("/dashboard")}
          aria-label={t("common.home", "Bosh sahifa")}
        >
          <Home size={22} strokeWidth={2.4} />
        </button>
      </main>
    </div>
  );
};

export default AiYordamchi;
