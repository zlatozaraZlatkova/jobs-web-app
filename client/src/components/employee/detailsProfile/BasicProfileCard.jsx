import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import BasicProfileEdit from "../editProfile/BasicProfileEdit";
import { getInitials } from "../../../utils/stringUtils";

export default function BasicProfileCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userData, setUserData] = useState({
    name: "John Doe",
    title: "Senior Frontend Developer",
    location: "London, UK",
    bio: "Experienced software engineer with over 8 years of expertise in full-stack development. Specialized in building scalable web applications and leading development teams.",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS"],
    github: "",
    linkedin: ""
  });

  const userInitials = getInitials(userData.name);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleSaveProfile = (updatedData) => {
    setUserData(updatedData);
    console.log("Profile updated:", updatedData);
  };


  return (
    <>
      <div className={styles.profileHeader}>
        <div className={styles.profileAvatar}>{userInitials}</div>
        <div className={styles.profileInfo}>
          <h1 className={styles.profileName}>{userData.name}</h1>
          <div className={styles.profileTitle}>{userData.title}</div>
          <div className={styles.profileLocation}>{userData.location}</div>
          <p className={styles.profileBio}>{userData.bio}</p>

          <div className={styles.skills}>
            {userData.skills.map((skill, index) => (
              <span key={index} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>

          <div className={styles.contactLink}>
            {userData.github && (
              <Link to={userData.github} className={styles.contactLink}>
                GitHub Repo
              </Link>
            )}
            {userData.linkedin && (
              <Link to={userData.linkedin} className={styles.contactLink}>
                LinkedIn
              </Link>
            )}
          </div>
        </div>
      
        <button
          className={styles.editProfileBtn}
          type="button"
          onClick={handleOpenModal}
        >
          Edit
        </button>
      </div>

      <BasicProfileEdit
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userData={userData}
        onSave={handleSaveProfile}
      />
    </>
  );
}
