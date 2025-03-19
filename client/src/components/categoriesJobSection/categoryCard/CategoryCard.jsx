/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

export default function CategoryCard({ isBackend, technologies }) {
  const getCountForTech = (techName) => {
    return technologies.filter((job) =>
      job.techStack && job.techStack.toLowerCase() === techName.toLowerCase()
    ).length;
  };

  function techItemContent(name, icon) {
    return (
      <>
        <i className={`${icon} tech-icon`} />
        <span className={styles.propertyName}>{name}:</span>
        <span className={styles.count}>{getCountForTech(name)}</span>
      </>
    );
  }

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsHeader}>
        <span className={styles.keyword}>const</span>
        <span className={styles.objectName}>
          {isBackend ? "BackendDevelopment" : "FrontendDevelopment"}
        </span>
        <span className={styles.totalCount}>= {"{"}</span>
      </div>

      {/* MAIN CONTAINER */}
      <div className={styles.statsContent}>
        {isBackend ? (
          // Backend Technologies
          <>
            <div className={styles.statsRow}>
              {getCountForTech("Java") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("Java", "fab fa-java")}
                </div>
              )}
              {getCountForTech(".NET") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent(".NET", "fab fa-microsoft")}
                </div>
              )}
            </div>
            <div className={styles.statsRow}>
              {getCountForTech("PHP") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("PHP", "fab fa-php")}
                </div>
              )}
            </div>
            <div className={styles.statsRow}>
              {getCountForTech("C_Cpp_Embedded") > 0 && (
                <div className={`${styles.statsItem} ${styles.fullWidth}`}>
                  {techItemContent("C_Cpp_Embedded", "fas fa-microchip")}
                </div>
              )}
            </div>
            <div className={styles.statsRow}>
              {getCountForTech("Python") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("Python", "fab fa-python")}
                </div>
              )}
              {getCountForTech("Ruby") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("Ruby", "fas fa-gem")}
                </div>
              )}
            </div>
            <div className={styles.statsRow}>
              {getCountForTech("Go") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("Go", "fab fa-golang")}
                </div>
              )}
              {getCountForTech("Node.js") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("Node.js", "fab fa-node-js")}
                </div>
              )}
            </div>
          </>
        ) : (
          // Frontend Technologies
          <>
            <div className={styles.statsRow}>
              {getCountForTech("HTML") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("HTML", "fab fa-html5")}
                </div>
              )}
              {getCountForTech("CSS") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("CSS", "fab fa-css3-alt")}
                </div>
              )}
            </div>
            <div className={styles.statsRow}>
              {getCountForTech("JavaScript") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("JavaScript", "fab fa-js")}
                </div>
              )}
            </div>
            <div className={styles.statsRow}>
              {getCountForTech("React") > 0 && (
                <div className={`${styles.statsItem} ${styles.fullWidth}`}>
                  {techItemContent("React", "fab fa-react")}
                </div>
              )}
            </div>
            <div className={styles.statsRow}>
              {getCountForTech("Angular") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("Angular", "fab fa-angular")}
                </div>
              )}
              {getCountForTech("Vue") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("Vue", "fab fa-vuejs")}
                </div>
              )}
            </div>
            <div className={styles.statsRow}>
              {getCountForTech("Next.js") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("Next.js", "fas fa-code")}
                </div>
              )}
              {getCountForTech("TypeScript") > 0 && (
                <div className={styles.statsItem}>
                  {techItemContent("TypeScript", "fas fa-code")}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className={styles.statsFooter}>{"}"}</div>
      <Link to={"/jobs"} className={styles.jobLink}>
        See More
      </Link>
    </div>
  );
}