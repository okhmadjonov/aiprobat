import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import inspectorImg from "@/assets/global/inspektor.png";
import cloudImg from "@/assets/global/snow.png";
import morningWidgetImg from "@/assets/global/day.png";
import styles from "./Home.module.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.container} onClick={handleStart}>
      <div className={styles.langWrapper} onClick={(e) => e.stopPropagation()}>
        <LanguageSwitcher />
      </div>

      <div className={styles.topRightWidget} onClick={(e) => e.stopPropagation()}>
        <img
          src={morningWidgetImg}
          alt="Tonggi vidjet"
          className={styles.widgetImage}
        />
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
