/* eslint-disable react/prop-types */
import styles from "./ProfileCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import BasicProfileEdit from "../editProfile/BasicProfileEdit";
import { getInitials, capitalizeName } from "../../../utils/stringUtils";
import { AuthContext } from "../../../contexts/AuthContext";

export default function BasicProfileCard({isEmployeesPage = false, isCVPage= false, employee, refreshData }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { _id } = useContext(AuthContext);
  const isProfileOwner = employee?.ownerId?._id === _id;
  console.log("isProfileOwner:", isProfileOwner);

  const userAvatar = employee?.ownerId?.avatar
    ? (<img src={employee.ownerId.avatar} alt="Profile avatar" />)
    : ("");

  const userInitials = employee?.ownerId?.name
    ? getInitials(employee.ownerId.name)
    : ("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleSaveProfile = (updatedData) => {
    console.log("Profile updated:", updatedData);
  };

  const handleDeleteProfile = () => {
    console.log("Deleting profile:", employee._id);
  };

  const handleViewProfile = () => {
    navigate(`/profile/catalog/${employee._id}`);
  };
  
  return (
    <>
      <div className={styles.profileHeader}>
        <div className={styles.profileAvatar}>
          {employee ? userAvatar : userInitials}
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.profileName}>{capitalizeName(employee?.ownerId?.name)}</h1>
          <div className={styles.profileTitle}>
            {employee.title}
          </div>
          <div className={styles.profileLocation}>
            {employee.location}
          </div>
          <p className={styles.profileBio}>
            {`Works at ${employee.company}`}
          </p>
          <p className={styles.profileBio}>
            {`${employee.website}`}
          </p>

          {employee.skills && employee.skills.length > 0 && (
            <div className={styles.skills}>
              {employee.skills.map((skill, index) => (
                <span key={index} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className={styles.contactLink}>
            {employee.github && (
              <Link to={employee.github} className={styles.contactLink}>
                GitHub Repo
              </Link>
            )}
            {employee.socialMedia?.linkedin && (
              <Link to={employee.socialMedia.linkedin} className={styles.contactLink} target="_blank">
                LinkedIn Profile
              </Link>
            )}
          </div>
        </div>
        {!isEmployeesPage && isProfileOwner ? (<>
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
        </>) : (
          !isCVPage && (
          <button className={styles.editProfileBtn}
            type="button"
            onClick={handleViewProfile}>
            View
          </button>
          )
          
        )}

      </div>

      <BasicProfileEdit
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userData={employee}
        onSave={handleSaveProfile}
        refreshData={refreshData}
      />
    </>
  );
}
