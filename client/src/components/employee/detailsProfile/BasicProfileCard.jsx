/* eslint-disable react/prop-types */
import styles from "./ProfileCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BasicProfileEdit from "../editProfile/BasicProfileEdit";
import { getInitials, capitalizeName } from "../../../utils/stringUtils";


export default function BasicProfileCard({ employee }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (employee) {
      setUserData(employee);
      //console.log("Updated employee data:", employee);
    }
  }, [employee]);

//  console.log("Current userData state:", userData);

  const userAvatar = userData?.ownerId?.avatar 
  ? (<img src={userData.ownerId.avatar} alt="Profile avatar" />) 
  : ("");

  const userInitials = userData?.ownerId?.name
    ? getInitials(userData.ownerId.name)
    : ("");

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

  const handleDeleteProfile = () => {
    console.log("Deleting profile:", userData._id);
  };

  const handleViewProfile = () => {
    navigate(`/profile/catalog/${employee._id}`);
  };

  return (
    <>
      <div className={styles.profileHeader}>
        <div className={styles.profileAvatar}>
          {userData ? userAvatar : userInitials}
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.profileName}>{capitalizeName(userData?.ownerId?.name)}</h1>
          <div className={styles.profileTitle}>
            {userData.title || userData.id}
          </div>
          <div className={styles.profileLocation}>
            {userData.location}
          </div>
          <p className={styles.profileBio}>
            {`Works at ${userData.company}`}
          </p>
          <p className={styles.profileBio}>
            {`${userData.website}`}
          </p>

          {userData.skills && userData.skills.length > 0 && (
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
            {userData.socialMedia?.linkedin && (
              <Link to={userData.socialMedia.linkedin} className={styles.contactLink}  target="_blank">
                LinkedIn Profile
              </Link>
            )}
          </div>
        </div>

         <button
          className={styles.editProfileBtn}
          type="button"
          onClick={handleViewProfile}
        >
          View
        </button>   
        <button
          className={styles.editProfileBtn}
          type="button"
          onClick={handleOpenModal}
        >
          Edit
        </button>
        <button
          className={styles.delProfileBtn}
          type="button"
          onClick={handleDeleteProfile}
        >
          Delete
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
