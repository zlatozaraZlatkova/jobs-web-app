import styles from "./TrustedCompaniesSection.module.css";
import CompanyLogo from "./companyLogo/CompanyLogo";

export default function TrustedCompaniesSection() {
  return (
    <>
      <section className={styles.trustedSection}>
        <div className={styles.trustedContainer}>
          <h2 className={styles.sectionTitle}>
            Trusted by your favored top techs companies
          </h2>
          <div className={styles.trustedLogoGrid}>
            <CompanyLogo />
            <CompanyLogo />
            <CompanyLogo />
            <CompanyLogo />
          </div>
        </div>
      </section>
    </>
  );
}
