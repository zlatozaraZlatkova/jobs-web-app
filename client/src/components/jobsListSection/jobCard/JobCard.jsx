/* eslint-disable react/prop-types */
import styles from "./JobCard.module.css";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { usePinJob, useUnpinJob } from "../../../apiHooks/useJobs";
import { AuthContext } from "../../../contexts/AuthContext";

export default function JobCard({ job }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [displayError, setDisplayError] = useState(null);

  const { _id: currentUserId } = useContext(AuthContext);
  const { submitPinJob, error: pinError } = usePinJob();
  const { submitUnpinJob, error: unpinError } = useUnpinJob();

  const [pinned, setPinned] = useState(
    job.pinnedByEmployees &&
      job.pinnedByEmployees.some((empId) => empId === currentUserId)
  );

  useEffect(() => {
    if (pinError) {
      setDisplayError(pinError);

    } else if (unpinError) {
      setDisplayError(unpinError);

    } else {
      setDisplayError(null);
    }
  }, [pinError, unpinError]);

  
  const togglePinStatus = async (id) => {
    try {
      if (!pinned) {
        const response = await submitPinJob(id);

        if (!response.isError) {
          setPinned(true);
        }
      } else {
        const response = await submitUnpinJob(id);

        if (!response.isError) {
          setPinned(false);
        }
      }
    } catch (err) {
      setDisplayError(err);
    }
  };

  const handlePinClick = () => {
    togglePinStatus(job._id);
  };

  const showHandler = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  const shortDescription =
    job.description.length > 100
      ? `${job.description.substring(0, 100)}...`
      : job.description;

  return (
    <>
      <article className={styles.jobCard}>
        {displayError && <div className="error-message">{displayError}</div>}

        <div className={styles.pinButtonContainer}>
          <button
            className={`${styles.pinButton} ${pinned ? styles.pinned : ""}`}
            onClick={handlePinClick}
          >
            <i className={pinned ? "fas fa-bookmark" : "far fa-bookmark"}></i>
          </button>
        </div>

        <div className={styles.jobCardContent}>
          <div className={styles.jobCardHeader}>
            <span className={styles.jobType}>{job.type}</span>
            <h3 className={styles.jobTitle}>{job.title}</h3>
          </div>

          <div className={styles.jobDescription}>
            {showFullDescription ? job.description : shortDescription}
          </div>

          <button className={styles.readMoreButton} onClick={showHandler}>
            {showFullDescription ? "← Less" : "Read more →"}
          </button>

          <h3 className={styles.jobSalary}>{job.salary} / Year</h3>

          <div className={styles.line}></div>

          <div className={styles.jobFooter}>
            <div className={styles.jobLocation}>
              <i className="fa-solid fa-location-dot" />
              <span>{job.location}</span>
            </div>

            <Link to={`/jobs/${job._id}`} className={styles.jobButton}>
              Read More
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
