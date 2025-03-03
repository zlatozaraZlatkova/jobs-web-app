import styles from "./ProfileCard.module.css";

export default function GitHubRepo() {
  return (
    <>
      {/* GitHub Repos Section */}
      <div className={styles.reposSection}>
        <h2 className={styles.sectionTitle}>GitHub Repos</h2>
        <div className={styles.repoCard}>
          <div className={styles.repoHeader}>
            <h3 className={styles.repoTitle}>React Grid</h3>
            <span className={styles.repoVisibility}>Public</span>
          </div>
          <p className={styles.repoDescription}>
            A responsive grid system built with React and TypeScript
          </p>
          <div className={styles.repoMeta}>
            <span className={styles.repoMetaItem}>⭐ 245 stars</span>
            <span className={styles.repoMetaItem}>🔄 32 forks</span>
            <span className={styles.repoMetaItem}>TypeScript</span>
          </div>
        </div>
        <div className={styles.repoCard}>
          <div className={styles.repoHeader}>
            <h3 className={styles.repoTitle}>Node Task</h3>
            <span className={styles.repoVisibility}>Public</span>
          </div>
          <p className={styles.repoDescription}>
            Task management CLI tool built with Node.js
          </p>
          <div className={styles.repoMeta}>
            <span className={styles.repoMetaItem}>⭐ 128 stars</span>
            <span className={styles.repoMetaItem}>🔄 18 forks</span>
            <span className={styles.repoMetaItem}>JavaScript</span>
          </div>
        </div>
      </div>
    </>
  );
}
