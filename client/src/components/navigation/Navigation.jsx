import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div className={styles.navLeft}>
            <h1>
              <a href="index.html">
                <span className="braces left-brace">
                  {"{"}
                </span>
                JobLink
                <span className="braces right-brace">
                  {"}"}
                </span>
              </a>
            </h1>
          </div>
          <div className={styles.navRight}>
            <label className={styles.themeToggle} title="Toggle dark mode">
              <input
                type="checkbox"
                id="theme-toggle"
                aria-label="Toggle dark mode"
              />
              <span className={styles.slider} />
            </label>
            <button className={styles.mobileMenuBtn} aria-label="Toggle menu">
              <span />
              <span />
              <span />
            </button>
            <ul className={styles.navLinks}>
              <li>
                <a href="jobs.html">Tech Jobs</a>
              </li>
              <li>
                <a href="profiles.html">Hire Talent</a>
              </li>
              <li>
                <a href="post.html">Forum</a>
              </li>
              <li>
                <a href="register.html">Register</a>
              </li>
              <li>
                <button className={styles.loginBtn}>Login</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
