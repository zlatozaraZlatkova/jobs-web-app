/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useDeleteEmployeeProfile } from "../../../apiHooks/useEmployee";
import { getInitials, capitalizeName } from "../../../utils/stringUtils";
import BasicProfileEdit from "../editProfile/BasicProfileEdit";
import styles from "./ProfileCard.module.css";

export default function BasicProfileCard({ isEmployeesPage = false, isCVPage = false, employee, refreshData }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayError, setDisplayError] = useState(null);

  const { submitDelProfile, error } = useDeleteEmployeeProfile();

  const { _id, isAuthenticated } = useContext(AuthContext);

  const isProfileOwner = isAuthenticated && _id && employee?.ownerId?._id === _id;

  useEffect(() => {
    if (error) {
      let errorMessage;

      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else {
        errorMessage = "BSONError: input must be a 24 character hex string";
      }

      setDisplayError(errorMessage);
    }
  }, [error]);

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


  const handleDeleteProfile = async () => {
    try {
      await submitDelProfile();

      navigate("/profile/create")

    } catch (error) {
      setDisplayError(error);
    }
  };


  const handleViewProfile = () => {
    navigate(`/profile/catalog/${employee._id}`);
  };

  return (
    <>
      <div className={styles.profileHeader}>
        {displayError && <div className="error-message">{displayError}</div>}
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

          {(isCVPage || isProfileOwner) && employee.bio && (
            <p className={styles.profileBio}>
              {employee.bio}
            </p>
          )}


          <div className={styles.contactLink}>
            {employee.socialMedia?.linkedin && (
              <Link to={employee.socialMedia.linkedin} className={styles.contactLink} target="_blank">
                LinkedIn Profile
              </Link>
            )}
          </div>

        </div>
        {!isEmployeesPage && isProfileOwner ? (
          <>
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
          </>
        ) : !isCVPage && !isProfileOwner ? (
          <button
            className={styles.editProfileBtn}
            type="button"
            onClick={handleViewProfile}
          >
            View
          </button>
        ) : !isCVPage && isProfileOwner ? (
          <button className={styles.editProfileBtn}>
            <Link to="/profile">My Profile</Link>
          </button>
        ) : null}

      </div>

      <BasicProfileEdit
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userData={employee}
        refreshData={refreshData}
      />
    </>
  );
}
