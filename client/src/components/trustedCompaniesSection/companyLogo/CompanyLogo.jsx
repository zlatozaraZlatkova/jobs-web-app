import styles from "./CompanyLogo.module.css";
// todo user react-icons

export default function CompanyLogo() {
  return (
    <>
      <a href="#" className={styles.logoLink}>
        <div className={styles.companyLogo}>
          {/* <i className="fas fa-code" /> */}
        </div>
      </a>
    </>
  );
}
