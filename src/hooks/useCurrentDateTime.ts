import { useState, useEffect } from "react";

export const useCurrentDateTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = now.getHours();
  // Kunduzi: 06:00 dan 18:00 gacha (6 <= hours < 18)
  // Tunda: 18:00 dan 06:00 gacha
  const isDay = hours >= 6 && hours < 18;

  const pad = (n: number) => String(n).padStart(2, "0");

  const timeStr = `${pad(hours)}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const dateStr = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;

  return { timeStr, dateStr, isDay, hours };
};

export default useCurrentDateTime;
