import styles from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.loaderContainer} data-testid="spinner">
      <div className={styles.loader} />
    </div>
  );
};

export default Spinner;
