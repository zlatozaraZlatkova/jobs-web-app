/* eslint-disable react/prop-types */
import styles from "./ProfileCard.module.css";
import { formatDate } from "../../../utils/formatDate";

export default function ExperienceCard({ experienceData }) {

  return (
    <>
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Experience</h2>

          {experienceData.map((exp) => (
            <div key={exp._id} className={styles.timelineItem}>
              <div className={styles.timelineHeader}>
                <div>
                  <h3 className={styles.timelineTitle}>{exp.title}</h3>
                  <div className={styles.timelineSubtitle}>{exp.company}</div>
                  <div className={styles.timelinePeriod}>
                    {formatDate(exp.from)} -{" "}
                    {exp.current ? "Present" : formatDate(exp.to)}{" "}
                    {exp.current && (
                      <span className={styles.currentBadge}>Current</span>
                    )}
                  </div>
                </div>
              </div>
              <p className={styles.timelineDescription}>{exp.description}</p>
            </div>
          ))}
        </div>
    </>
  );
}
