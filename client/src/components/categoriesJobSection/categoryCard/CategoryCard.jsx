/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";


export default function CategoryCard({ isBackend, technologies }) {
 
  // Function to count jobs for a specific technology
  const getCountForTech = (techName) => {
    return technologies.filter(job => 
      job.title.toLowerCase().includes(techName.toLowerCase())
    ).length;
  };

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsHeader}>
        <span className={styles.keyword}>const</span>
        <span className={styles.objectName}>
          {isBackend ? 'BackendDevelopment' : 'FrontendDevelopment'}
        </span>
        <span className={styles.totalCount}>= {"{"}</span>
      </div>
      
      {/* MAIN CONTAINER */}
      <div className={styles.statsContent}>
        {isBackend ? (
          // Backend Technologies
          <>
            <div className={styles.statsRow}>
              <div className={styles.statsItem}>
                <i className="fab fa-java tech-icon" />
                <span className={styles.propertyName}>Java:</span>
                <span className={styles.count}>{getCountForTech('Java')}</span>
              </div>
              <div className={styles.statsItem}>
                <i className="fab fa-microsoft tech-icon" />
                <span className={styles.propertyName}>.NET:</span>
                <span className={styles.count}>{getCountForTech('.NET')}</span>
              </div>
            </div>
            <div className={styles.statsRow}>
              <div className={styles.statsItem}>
                <i className="fab fa-php tech-icon" />
                <span className={styles.propertyName}>PHP:</span>
                <span className={styles.count}>{getCountForTech('PHP')}</span>
              </div>
            </div>
            <div className={styles.statsRow}>
              <div className={`${styles.statsItem} ${styles.fullWidth}`}>
                <i className="fas fa-microchip tech-icon" />
                <span className={styles.propertyName}>C_Cpp_Embedded:</span>
                <span className={styles.count}>{getCountForTech('C_Cpp_Embedded')}</span>
              </div>
            </div>
            <div className={styles.statsRow}>
              <div className={styles.statsItem}>
                <i className="fab fa-python tech-icon" />
                <span className={styles.propertyName}>Python:</span>
                <span className={styles.count}>{getCountForTech('Python')}</span>
              </div>
              <div className={styles.statsItem}>
                <i className="fas fa-gem tech-icon" />
                <span className={styles.propertyName}>Ruby:</span>
                <span className={styles.count}>{getCountForTech('Ruby')}</span>
              </div>
            </div>
            <div className={styles.statsRow}>
              <div className={styles.statsItem}>
                <i className="fab fa-golang tech-icon" />
                <span className={styles.propertyName}>Go:</span>
                <span className={styles.count}>{getCountForTech('Go')}</span>
              </div>
              <div className={styles.statsItem}>
                <i className="fab fa-node-js tech-icon" />
                <span className={styles.propertyName}>Node.js:</span>
                <span className={styles.count}>{getCountForTech('Node.js')}</span>
              </div>
            </div>
          </>
        ) : (
          // Frontend Technologies
          <>
            <div className={styles.statsRow}>
              <div className={styles.statsItem}>
                <i className="fab fa-html5 tech-icon" />
                <span className={styles.propertyName}>HTML:</span>
                <span className={styles.count}>{getCountForTech('HTML')}</span>
              </div>
              <div className={styles.statsItem}>
                <i className="fab fa-css3-alt tech-icon" />
                <span className={styles.propertyName}>CSS:</span>
                <span className={styles.count}>{getCountForTech('CSS')}</span>
              </div>
            </div>
            <div className={styles.statsRow}>
              <div className={styles.statsItem}>
                <i className="fab fa-js tech-icon" />
                <span className={styles.propertyName}>JavaScript:</span>
                <span className={styles.count}>{getCountForTech('JavaScript')}</span>
              </div>
            </div>
            <div className={styles.statsRow}>
              <div className={`${styles.statsItem} ${styles.fullWidth}`}>
                <i className="fab fa-react tech-icon" />
                <span className={styles.propertyName}>React:</span>
                <span className={styles.count}>{getCountForTech('React')}</span>
              </div>
            </div>
            <div className={styles.statsRow}>
              <div className={styles.statsItem}>
                <i className="fab fa-angular tech-icon" />
                <span className={styles.propertyName}>Angular:</span>
                <span className={styles.count}>{getCountForTech('Angular')}</span>
              </div>
              <div className={styles.statsItem}>
                <i className="fab fa-vuejs tech-icon" />
                <span className={styles.propertyName}>Vue:</span>
                <span className={styles.count}>{getCountForTech('Vue')}</span>
              </div>
            </div>
            <div className={styles.statsRow}>
              <div className={styles.statsItem}>
                <i className="fas fa-code tech-icon" />
                <span className={styles.propertyName}>Next.js:</span>
                <span className={styles.count}>{getCountForTech('Next.js')}</span>
              </div>
              <div className={styles.statsItem}>
                <i className="fas fa-code tech-icon" />
                <span className={styles.propertyName}>TypeScript:</span>
                <span className={styles.count}>{getCountForTech('TypeScript')}</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.statsFooter}>{"}"}</div>
      <Link to={"/jobs"} className={styles.jobLink}>
        See More
        {/* <i className="fas fa-arrow-right" /> */}
      </Link>
    </div>
  );
}
