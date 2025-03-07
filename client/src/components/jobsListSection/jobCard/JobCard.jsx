/* eslint-disable react/prop-types */
import styles from "./JobCard.module.css";
// todo: use react icons

export default function JobCard({job}) {
  return (
    <>
      <article className={styles.jobCard}>
        <span className={styles.jobType}>{job.type}</span>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <p className={styles.jobDescription}>
          {job.description}
        </p>
        <div className={styles.jobDetails}>
          <div className={styles.jobLocation}>
            {/* <i className="fa-solid fa-location-dot" /> */}
            <span>{job.location}</span>
          </div>
          <div className={styles.jobSalary}>{job.salary} / Year</div>
          <a href="job.html" className={styles.jobLink}>
            Read More
            {/* <i className="fas fa-arrow-right" /> */}
          </a>
        </div>
      </article>
    </>
  );
}
