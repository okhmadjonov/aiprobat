import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import inspectorImg from "@/assets/global/inspektor.png";
import cloudImg from "@/assets/global/snow.png";
import dayWidgetImg from "@/assets/global/day.png";
import nightWidgetImg from "@/assets/global/night.png";
import useCurrentDateTime from "@/hooks/useCurrentDateTime";
import styles from "./Home.module.scss";

const Home = () => {
  const navigate = useNavigate();
  const { timeStr, dateStr, isDay } = useCurrentDateTime();

  const handleStart = () => {
    navigate("/dashboard");
  };

  const widgetImg = isDay ? dayWidgetImg : nightWidgetImg;
  const widgetAlt = isDay ? "Kunduzgi vidjet" : "Tungi vidjet";

  return (
    <div className={styles.container} onClick={handleStart}>
      <div className={styles.langWrapper} onClick={(e) => e.stopPropagation()}>
        <LanguageSwitcher />
      </div>

      <div className={styles.topRightWidget} onClick={(e) => e.stopPropagation()}>
        <img
          src={widgetImg}
          alt={widgetAlt}
          className={styles.widgetImage}
        />
        <div className={styles.widgetDateTime}>
          <div className={styles.widgetTime}>{timeStr}</div>
          <div className={styles.widgetDate}>{dateStr}</div>
        </div>
      </div>

      <main className={styles.centerContent}>
        <img
          src={inspectorImg}
          alt="Probatsiya inspektori"
          className={styles.inspector}
        />
      </main>

      <footer className={styles.weatherCard} onClick={(e) => e.stopPropagation()}>
        <img src={cloudImg} alt="Qorli ob-havo" className={styles.cloudIcon} />
        <span className={styles.tempText}>-20°C</span>
      </footer>
    </div>
  );
};

export default Home;
