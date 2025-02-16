import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <>
      <section className={styles.searchSection}>
        <h1>GET HIRED &amp; BUILD A STRONG TEAM</h1>
        <p>Advance your career and build a strong, successful team.</p>
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
      </section>
    </>
  );
}
