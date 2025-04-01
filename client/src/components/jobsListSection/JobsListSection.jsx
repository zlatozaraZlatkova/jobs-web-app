/* eslint-disable react/prop-types */
import styles from "./JobsListSection.module.css";
import JobCard from "./jobCard/JobCard";

export default function JobsListSection({ jobs, isLoading }) {
  return (
    <>
      {isLoading ? (
        <div>Loading open positions...</div>
      ) : (
        <div className={styles.jobsGrid}>
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))
          ) : (
            <div>No jobs found.</div>
          )}
        </div>
      )}
    </>
  );
}
