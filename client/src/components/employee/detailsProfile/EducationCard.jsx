/* eslint-disable react/prop-types */
import styles from "./ProfileCard.module.css";
import { formatDate } from "../../../utils/formatDate";

export default function EducationCard({ educationData }) {
  console.log("Props data:", educationData);
  return (
    <>
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Education</h2>

          {educationData.map((edu) => (
            <div key={edu._id} className={styles.timelineItem}>
              <div className={styles.timelineHeader}>
                <div>
                  <h3 className={styles.timelineTitle}>{edu.degree}</h3>
                  <div className={styles.timelineSubtitle}>
                    {edu.institution}
                  </div>
                  <div className={styles.timelinePeriod}>
                    {formatDate(edu.from)} -{" "}
                    {edu.current ? "Present" : formatDate(edu.to)}{" "}
                    {edu.current && (
                      <span className={styles.currentBadge}>Current</span>
                    )}
                  </div>
                </div>
              </div>
              <p className={styles.timelineDescription}>{edu.description}</p>
            </div>
          ))}
        </div>
    </>
  );
}
