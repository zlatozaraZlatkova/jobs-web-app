import styles from "./FeaturedJobSection.module.css";

import JobCard from "./jobCard/JobCard";

export default function FeaturedJobSection() {
  return (
    <>
      <section className={styles.featuredJobs}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Positions</h2>
          <div className={styles.jobsGrid}>
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
          <div className="text-center">
            <a
              href="jobs.html"
              className="btn btn-primary"
            >
              Explore More
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
