/* eslint-disable react/prop-types */
import styles from "./JobCard.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function JobCard({job}) {
   const [showFullDescription, setShowFullDescription] = useState(false);
  
   const showHandler = () => {
    setShowFullDescription((prevState) => !prevState);
   };
   
   const shortDescription = job.description.length > 100 
     ? `${job.description.substring(0, 100)}...` 
     : job.description;

  return (
    <>
      <article className={styles.jobCard}>
        <div className={styles.jobCardContent}>
          <div className={styles.jobCardHeader}>
            <span className={styles.jobType}>{job.type}</span>
            <h3 className={styles.jobTitle}>{job.title}</h3>
          </div>

          <div className={styles.jobDescription}>
            {showFullDescription ? job.description : shortDescription}
          </div>
          
          <button 
            className={styles.readMoreButton}
            onClick={showHandler}
          >
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
