import styles from "./AnimatedBackground.module.scss";

const AnimatedBackground = () => {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.patternGrid} />
      <div className={styles.ringsGroup}>
        <div className={styles.ring1} />
        <div className={styles.ring2} />
        <div className={styles.ring3} />
      </div>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.wave} />
    </div>
  );
};

export default AnimatedBackground;
