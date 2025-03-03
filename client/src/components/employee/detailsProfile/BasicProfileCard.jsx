import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";


export default function BasicProfileCard() {
 
  return (
    <>
      <div className={styles.profileHeader}>
        <div className={styles.profileAvatar}>JD</div>
        <div className={styles.profileInfo}>
          <h1 className={styles.profileName}>John Doe</h1>
          <div className={styles.profileTitle}>Senior Frontend Developer</div>
          <div className={styles.profileLocation}>London, UK</div>
          <p className={styles.profileBio}>
            Experienced software engineer with over 8 years of expertise in
            full-stack development. Specialized in building scalable web
            applications and leading development teams.
          </p>
          <div className={styles.skills}>
            <span className={styles.skillTag}>JavaScript</span>
            <span className={styles.skillTag}>React</span>
            <span className={styles.skillTag}>Node.js</span>
            <span className={styles.skillTag}>TypeScript</span>
            <span className={styles.skillTag}>HTML/CSS</span>
          </div>
          <div className={styles.contactLink}>
            <Link to={""} className={styles.contactLink}>
              GitHub Repo
            </Link>
            <Link to={""} className={styles.contactLink}>
              LinkedIn
            </Link>
            <Link to={""} className={styles.contactLink}>
              Email
            </Link>
          </div>
        </div>
        <button className={styles.editProfileBtn} type="button">
          Edit
        </button>
      </div>
 
      
    </>
  );
}
