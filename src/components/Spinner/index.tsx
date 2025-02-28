import styles from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Spinner;
