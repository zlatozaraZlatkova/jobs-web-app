import styles from "./Footer.module.css";

// todo user react-icons

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <a href="#" className={styles.logoLink}>
            <div className={styles.logoIcon}>
              <span>
                {"{"}...{"}"}
              </span>

              {/* <i class="fas fa-code"></i> */}
            </div>
          </a>
          <div className={styles.copyright}>© 2025 All Rights Reserved</div>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              {/* <i className="fab fa-twitter" /> */}
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              {/* <i className="fab fa-instagram" /> */}
            </a>
            <a href="#" className={styles.socialLink} aria-label="YouTube">
              {/* <i className="fab fa-youtube" /> */}
            </a>
            <a href="#" className={styles.socialLink} aria-label="GitHub">
              {/* <i className="fab fa-github" /> */}
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              {/* <i className="fab fa-linkedin" /> */}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
