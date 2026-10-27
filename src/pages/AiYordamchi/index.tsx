import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { Mic, Send } from "lucide-react";
import Header from "@/components/Layout/header";
import airobotImg from "@/assets/global/airobot.png";
import styles from "./AiYordamchi.module.scss";


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

const getBotAnswer = (q: string, t: TFunction): string => {
  const lower = q.toLowerCase();
  if (
    lower.includes("nima") ||
    lower.includes("tushuncha") ||
    lower.includes("что такое")
  ) {
    return t("aiYordamchi.answers.whatIs");
  }
  if (
    lower.includes("axloq") ||
    lower.includes("ati") ||
    lower.includes("исправительн")
  ) {
    return t("aiYordamchi.answers.ati");
  }
  if (
    lower.includes("moddiy") ||
    lower.includes("yordam") ||
    lower.includes("помощ")
  ) {
    return t("aiYordamchi.answers.help");
  }
  if (
    lower.includes("inspektor") ||
    lower.includes("bog'lanish") ||
    lower.includes("инспектор") ||
    lower.includes("telefon")
  ) {
    return t("aiYordamchi.answers.inspector");
  }
  return t("aiYordamchi.answers.default");
};

const AiYordamchi = () => {
  const { t } = useTranslation();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

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
      const answer = getBotAnswer(trimmed, t);
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
      recognition.lang = t("aiYordamchi.speechLang", "uz-UZ");
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
                      {t("aiYordamchi.chatTitle", "AI BILAN MULOQOT")}
                    </span>
                    <button
                      type="button"
                      className={styles.resetChatBtn}
                      onClick={() => setMessages([])}
                    >
                      {t("aiYordamchi.clear", "Tozalash")}
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
                          {t("aiYordamchi.typing", "AI javob tayyorlamoqda...")}
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
                  ? t("aiYordamchi.listeningPrompt", "Sizni eshitmoqdaman...")
                  : t("aiYordamchi.placeholder", "Savolingizni bu yerga yozing...")
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
