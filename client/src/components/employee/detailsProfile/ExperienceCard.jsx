import styles from "./ProfileCard.module.css";

export default function ExperienceCard() {
  return (
    <>
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.timelineItem}>
          <div className={styles.timelineHeader}>
            <div>
              <h3 className={styles.timelineTitle}>
                Senior Frontend Developer
              </h3>
              <div className={styles.timelineSubtitle}>Oracle</div>
              <div className={styles.timelinePeriod}>
                Oct 2009 - Present{" "}
                <span className={styles.currentBadge}>Current</span>
              </div>
            </div>
          </div>
          <p className={styles.timelineDescription}>
            High quality awareness as well as willingness to learn and openness
            for new technologies. Leading development of cloud-based enterprise
            applications.
          </p>
          {/* isOwner  */}
          <button className={styles.editProfileBtn} type="button">
            Edit
          </button>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.timelineHeader}>
            <div>
              <h3 className={styles.timelineTitle}>Software Engineer</h3>
              <div className={styles.timelineSubtitle}>Google</div>
              <div className={styles.timelinePeriod}>Jan 2007 - Sep 2009</div>
            </div>
          </div>
          <p className={styles.timelineDescription}>
            Developed and maintained multiple web applications using React and
            Node.js. Collaborated with UX team to improve user experience and
            accessibility.
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
