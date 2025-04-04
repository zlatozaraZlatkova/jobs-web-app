/* eslint-disable react/prop-types */
import styles from "../TrustedCompaniesSection.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CompanyLogo({ name, logo, alt }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.logoContainer}>
      {logo && !imageError ? (
        <img
          src={logo}
          alt={alt || `${name} logo`}
          className={styles.companyLogo}
          onError={() => setImageError(true)} 
        />
      ) : (
        <Link to="#" className={styles.logoLink}>
          <div className={styles.companyLogo}>
            <i className="fas fa-code" />
          </div>
        </Link>
      )}
      {name && <p className={styles.companyName}>{name}</p>}
    </div>
  );
}
