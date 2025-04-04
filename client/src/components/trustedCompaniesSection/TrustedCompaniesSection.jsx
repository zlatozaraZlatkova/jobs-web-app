import styles from "./TrustedCompaniesSection.module.css";

import CompanyLogo from "./companyLogo/CompanyLogo";
import { useGetCompanyList } from "../../apiHooks/useEmployer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TrustedCompaniesSection() {
  const [serverError, setServerError] = useState(null);
  
  const { companies, error } = useGetCompanyList();
  let companyList = companies?.data?.items || [];
  companyList = companyList.slice(0,5);


  useEffect(() => {
    if (error) {
      setServerError(error);
      const timer = setTimeout(() => {
        setServerError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  return (
    <>
      <section className={styles.trustedSection}>
        {serverError && <div className="error-message">{serverError}</div>}
        <div className={styles.trustedContainer}>
          <h2 className={styles.sectionTitle}>
            Trusted by your favored top tech companies
          </h2>
          <div className={styles.trustedLogoGrid}>
            {companyList && companyList.length > 0
              ? companyList.map((company) => (
                  <CompanyLogo
                    key={company._id}
                    name={company.companyName}
                    logo={company.companyLogo}
                  />
                ))
              : Array.from({ length: 5 }, (value, index) => (
                  <div
                    key={`default-${index}`}
                    className={styles.logoContainer}
                  >
                    <Link to="#" className={styles.logoLink}>
                      <div className={styles.companyLogo}>
                        <i className="fas fa-code" />
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
}
