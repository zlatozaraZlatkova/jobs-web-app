import styles from "./ProfileCard.module.css";

export default function EducationCard() {
  return (
    <>
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Education</h2>

        <div className={styles.timelineItem}>
          <div className={styles.timelineHeader}>
            <div>
              <h3 className={styles.timelineTitle}>JS Web Developer</h3>
              <div className={styles.timelineSubtitle}>SoftUni</div>
              <div className={styles.timelinePeriod}>
                Sep 2009 - Nov 2024{" "}
                <span className={styles.currentBadge}>Current</span>
              </div>
            </div>
          </div>
          <p className={styles.timelineDescription}>
            The program aims at people with professional experience who want to
            pursue a part-time bachelor&apos;s degree with a focus on management
            in parallel to their career.
          </p>
          {/* isOwner  */}
          <button className={styles.editProfileBtn} type="button">
            Edit
          </button>
        </div>
      </div>
    </>
  );
}
