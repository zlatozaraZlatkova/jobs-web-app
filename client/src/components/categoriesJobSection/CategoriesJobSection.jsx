/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import styles from "./CategoriesJobSection.module.css";
import CategoryCard from "./categoryCard/CategoryCard";
import { getAllJobs } from '../../api/jobsApi';

export default function CategoriesJobSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [frontendTechnologies, setFrontendTechnologies] = useState([]);
  const [backendTechnologies, setBackendTechnologies] = useState([]);

  useEffect(() => {

    const fetchAllJobs = async () => {
      try {
        setIsLoading(true);

        const allJobs = await getAllJobs();
        console.log("All fetched jobs", allJobs);

        if (allJobs.length === 0) {
          setJobs([]);
          setFrontendTechnologies([]);
          setBackendTechnologies([]);
          return;
        }


        setJobs(allJobs);
       
        const frontend = allJobs.filter(job => job.technologies === "frontend");
        const backend = allJobs.filter(job => job.technologies === "backend");

        setFrontendTechnologies(frontend);
        setBackendTechnologies(backend);


      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs([]);
        setFrontendTechnologies([]);
        setBackendTechnologies([]);

      } finally {
        setIsLoading(false);
      }
    };

    fetchAllJobs();
  }, []);

  return (
    <>
      <section className={styles.infoSection}>
        <div className={styles.container}>
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
