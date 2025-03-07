/* eslint-disable react/prop-types */
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Position"
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Location"
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Salary"
        />

        <button className={styles.submitBtn}>SEARCH BY STACK</button>
      </div>
    </>
  );
}
