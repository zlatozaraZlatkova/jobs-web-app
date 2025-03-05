/* eslint-disable react/prop-types */
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BasicProfileEdit from "../editProfile/BasicProfileEdit";
import { getInitials } from "../../../utils/stringUtils";

export default function BasicProfileCard({employee}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(employee || {});
  
  useEffect(() => {
    if (employee) {
      setUserData(employee);
      console.log("Employee data:", employee);
    }
  }, [employee]);

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
          
          {userData.skills && (
            <div className={styles.skills}>
              {userData.skills.map((skill, index) => (
                <span key={index} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          )}
          
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
