/* eslint-disable react/prop-types */
import styles from "./JobCard.module.css";
import { Link } from "react-router-dom";


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
            <i className="fa-solid fa-location-dot" />
            <span>{job.location}</span>
          </div>
          <div className={styles.jobSalary}>{job.salary} / Year</div>
          <Link to={`/jobs/${job._id}`} className={styles.jobLink}>
            Read More
            <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </article>
    </>
  );
}
