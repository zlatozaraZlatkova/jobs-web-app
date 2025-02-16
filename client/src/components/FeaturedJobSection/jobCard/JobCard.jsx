import styles from "./JobCard.module.css";
// todo: use react icons

export default function JobCard() {
  return (
    <>
      <article className={styles.jobCard}>
        <span className={styles.jobType}>Remote</span>
        <h3 className={styles.jobTitle}>Front-End Engineer (React)</h3>
        <p className={styles.jobDescription}>
          Join our team as a Front-End Developer in sunny Miami, FL. We are
          looking for a motivated individual with a passion... More
        </p>
        <div className={styles.jobDetails}>
          <div className={styles.jobLocation}>
            {/* <i className="fa-solid fa-location-dot" /> */}
            <span>Miami, FL</span>
          </div>
          <div className={styles.jobSalary}>$70K - $80K / Year</div>
          <a href="job.html" className={styles.jobLink}>
            Read More
            {/* <i className="fas fa-arrow-right" /> */}
          </a>
        </div>
      </article>
    </>
  );
}
