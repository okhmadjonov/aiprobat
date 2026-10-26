import { useState } from "react";
import { useTranslation } from "react-i18next";
import {  Mic, Send } from "lucide-react";
import Header from "@/components/Layout/header";
import airobotImg from "@/assets/global/airobot.png";
import styles from "./AiYordamchi.module.scss";

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

const ArrowRightSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="white"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

const getBotAnswer = (q: string, isRu: boolean): string => {
  const lower = q.toLowerCase();
  if (
    lower.includes("nima") ||
    lower.includes("tushuncha") ||
    lower.includes("что такое")
  ) {
    return isRu
      ? "Пробация — это социально-правовой институт, осуществляющий контроль за исполнением наказаний, не связанных с лишением свободы, и оказывающий помощь в социальной адаптации осужденных."
      : "Probatsiya — bu sud tomonidan ozodlikdan mahrum qilish bilan bog'liq bo'lmagan jazolarga hukm qilingan shaxslarning xulq-atvori ustidan nazorat o'rnatish va ularning ijtimoiy moslashuviga ko'maklashish tizimidir.";
  }
  if (
    lower.includes("axloq") ||
    lower.includes("ati") ||
    lower.includes("исправительн")
  ) {
    return isRu
      ? "Исправительные работы назначаются на срок от 6 месяцев до 3 лет с удержанием от 10% до 30% заработной платы в доход государства по месту работы или в местах, определяемых органами пробации."
      : "Axloq tuzatish ishlari (ATI) — mahkumning ish haqidan davlat daromadiga 10% dan 30% gacha miqdorda ushlab qolingan holda, u o'z ish joyida yoki probatsiya organi belgilagan joylarda mehnat qilishi bilan o'taladi (muddati 6 oydan 3 yilgacha).";
  }
  if (
    lower.includes("moddiy") ||
    lower.includes("yordam") ||
    lower.includes("помощ")
  ) {
    return isRu
      ? "Материальная помощь оказывается через территориальные органы пробации и центры 'Инсон'. Вы можете подать заявление на единовременную помощь, профессиональное обучение или трудоустройство."
      : "Moddiy yordam olish uchun probatsiya hisobida turgan shaxs o'z hududiy probatsiya inspektori yoki 'Inson' ijtimoiy xizmatlar markaziga ariza topshiradi. Bir martalik nafaqa, kasb-hunarga o'qitish va ish bilan ta'minlash choralari ko'riladi.";
  }
  if (
    lower.includes("inspektor") ||
    lower.includes("bog'lanish") ||
    lower.includes("инспектор") ||
    lower.includes("telefon")
  ) {
    return isRu
      ? "Вы можете найти контакты и адреса районных отделов пробации в разделе 'Инспекторы' главного меню."
      : "O'z tumaningizdagi probatsiya xizmati xodimlari bilan bog'lanish uchun bosh menyudagi 'Inspektorlar' bo'limiga kiring va xaritadan o'z viloyatingiz hamda tumaningizni tanlang.";
  }
  return isRu
    ? "Ваш запрос принят. Для получения официальной консультации по вашему делу обратитесь к районному инспектору пробации или изучите раздел нормативно-правовых документов."
    : "Savolingiz qabul qilindi. Ushbu masala bo'yicha batafsil huquqiy yordam olish uchun hududiy probatsiya noziringizga uchrashishingiz yoki tizimdagi 'Me'yoriy hujjatlar' bo'limidan foydalanishingiz mumkin.";
};

const AiYordamchi = () => {
  const { t, i18n } = useTranslation();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const isRu = (i18n.language || "uz").toLowerCase().startsWith("ru");

  const sampleQuestions = [
    t("aiYordamchi.q1", "Probatsiya nima?"),
    t("aiYordamchi.q2", "Axloq tuzatish ishlari qanday jazo ?"),
    t("aiYordamchi.q3", "Moddiy yordam qanday olinadi ?"),
    t("aiYordamchi.q4", "Inspektorlar bilan qanday bog'lanish mumkin ?"),
  ];

  const handleSelectSample = (sample: string) => {
    sendText(sample);
  };

  const sendText = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    setMessages((prev) => {
      const userMsg: Message = {
        id: String(prev.length + 1),
        sender: "user",
        text: trimmed,
      };
      return [...prev, userMsg];
    });
    setQuestion("");
    setIsTyping(true);

    setTimeout(() => {
      const answer = getBotAnswer(trimmed, isRu);
      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          sender: "bot",
          text: answer,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleSend = () => {
    sendText(question);
  };

  const toggleVoiceInput = () => {
    interface SpeechResultEvent {
      results: Array<Array<{ transcript: string }>>;
    }
    interface SpeechInstance {
      lang: string;
      interimResults: boolean;
      onstart: () => void;
      onend: () => void;
      onerror: () => void;
      onresult: (e: SpeechResultEvent) => void;
      start: () => void;
    }
    type SpeechCtor = new () => SpeechInstance;

    const win = window as unknown as {
      SpeechRecognition?: SpeechCtor;
      webkitSpeechRecognition?: SpeechCtor;
    };
    const SpeechRecognition =
      win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setQuestion(sampleQuestions[0]);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = isRu ? "ru-RU" : "uz-UZ";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: SpeechResultEvent) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setQuestion(transcript);
        }
      };
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header
        title={t("aiYordamchi.title", "AI YORDAMCHI")}
        titleExtra={<SparklesSvg />}
      />

      <main className={styles.mainWrapper}>
        <div className={styles.whiteCard}>
          <div className={styles.topSection}>
            <div className={styles.leftColumn}>
              {messages.length === 0 ? (
                <>
                  <h2 className={styles.promptText}>
                    {t(
                      "aiYordamchi.prompt",
                      "Probatsiyaga oid savollaringizni yozing yoki ovozli so'rashingiz mumkin.",
                    )}
                  </h2>

                  <span className={styles.misolSavollarTitle}>
                    {t("aiYordamchi.sampleTitle", "MISOL SAVOLLAR")}
                  </span>

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
                </>
              ) : (
                <>
                  <div className={styles.chatHeaderRow}>
                    <span className={styles.misolSavollarTitle}>
                      {isRu ? "ДИАЛОГ С ИИ" : "AI BILAN MULOQOT"}
                    </span>
                    <button
                      type="button"
                      className={styles.resetChatBtn}
                      onClick={() => setMessages([])}
                    >
                      {isRu ? "Очистить" : "Tozalash"}
                    </button>
                  </div>

                  <div className={styles.chatHistory}>
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={
                          m.sender === "user"
                            ? styles.chatMessageUser
                            : styles.chatMessageBot
                        }
                      >
                        {m.text}
                      </div>
                    ))}
                    {isTyping && (
                      <div className={styles.typingIndicator}>
                        <span>
                          {isRu
                            ? "ИИ печатает ответ..."
                            : "AI javob tayyorlamoqda..."}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

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

          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.textInput}
              placeholder={
                isListening
                  ? isRu
                    ? "Слушаю вас..."
                    : "Sizni eshitmoqdaman..."
                  : t("aiYordamchi.placeholder", "Savolingizni yozing ...")
              }
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
                style={isListening ? { color: "#ef4444" } : undefined}
                onClick={toggleVoiceInput}
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
      </main>
    </div>
  );
};

export default AiYordamchi;
