import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <p className={styles.loaderText}>Abhi Trainings</p>
    </div>
  );
};

export default Loader;
