import styles from "./CategoryCard.module.css";
// todo: use react icons

export default function CategoryCard() {
  return (
    <>
      <div className={styles.statsContainer}>
        <div className={styles.statsHeader}>
          <span className={styles.keyword}>const</span>
          <span className={styles.objectName}>BackendDevelopment</span>
          <span className={styles.totalCount}>= {"{"}</span>
          {/* <span class="circle-count">600</span> */}
        </div>
        <div className={styles.statsContent}>
          <div className={styles.statsRow}>
            <div className={styles.statsItem}>
              {/* <i className="fab fa-java tech-icon" /> */}
              <span className={styles.propertyName}>Java:</span>
              <span className={styles.count}>156</span>
            </div>
            <div className={styles.statsItem}>
              {/* <i className="fab fa-microsoft tech-icon" /> */}
              <span className={styles.propertyName}>.NET:</span>
              <span className={styles.count}>128</span>
            </div>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statsItem}>
              {/* <i className="fab fa-php tech-icon" /> */}
              <span className={styles.propertyName}>PHP:</span>
              <span className={styles.count}>51</span>
            </div>
          </div>
          <div className={styles.statsRow}>
            <div className={`${styles.statsItem} ${styles.fullWidth}`}>
              {/* <i className="fas fa-microchip tech-icon" /> */}
              <span className={styles.propertyName}>C_Cpp_Embedded:</span>
              <span className={styles.count}>70</span>
            </div>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statsItem}>
              {/* <i className="fab fa-python tech-icon" /> */}
              <span className={styles.propertyName}>Python:</span>
              <span className={styles.count}>75</span>
            </div>
            <div className={styles.statsItem}>
              {/* <i className="fas fa-gem tech-icon" /> */}
              <span className={styles.propertyName}>Ruby:</span>
              <span className={styles.count}>1</span>
            </div>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statsItem}>
              {/* <i className="fab fa-golang tech-icon" /> */}
              <span className={styles.propertyName}>Go:</span>
              <span className={styles.count}>23</span>
            </div>
            <div className={styles.statsItem}>
              {/* <i className="fab fa-node-js tech-icon" /> */}
              <span className={styles.propertyName}>Node_js:</span>
              <span className={styles.count}>71</span>
            </div>
          </div>
        </div>
        <div className={styles.statsFooter}>{"}"}</div>
        <a href="job.html" className={styles.jobLink}>
          See More
          {/* <i className="fas fa-arrow-right" /> */}
        </a>
      </div>

      
    </>
  );
}
