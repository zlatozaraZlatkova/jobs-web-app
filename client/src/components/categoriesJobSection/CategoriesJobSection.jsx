/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import styles from "./CategoriesJobSection.module.css";
import CategoryCard from "./categoryCard/CategoryCard";
import {useGetCategoriesJob } from "../../apiHooks/useJobs";

export default function CategoriesJobSection() {
  const {jobs, frontendTechnologies, backendTechnologies, isLoading, error } = useGetCategoriesJob();
  const [displayError, setDisplayError] = useState(null);
  
  useEffect(() => {
    if (error) {
      setDisplayError(error);
    }
  }, [error]);
  
  return (
    <>
      <section className={styles.infoSection}>
        <div className={styles.container}>
        {displayError && <div className="error-message">{displayError}</div>}
          <h2 className={styles.sectionTitle}>Explore By Category</h2>
          <div className={styles.infoGrid}>
            {isLoading ? (
              <div className={styles.loadingContainer}>Loading categories...</div>
            ) : (
              <>
                <CategoryCard
                  isBackend={false}
                  technologies={frontendTechnologies}
                />
                <CategoryCard
                  isBackend={true}
                  technologies={backendTechnologies}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
