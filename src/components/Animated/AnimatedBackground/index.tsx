import styles from "./AnimatedBackground.module.scss";

const AnimatedBackground = () => {
  return (
    <div className={styles.background}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.wave} />
    </div>
  );
};

export default AnimatedBackground;
