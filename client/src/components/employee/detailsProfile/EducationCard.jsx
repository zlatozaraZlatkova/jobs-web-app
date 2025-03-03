import { useState } from "react";
import EducationProfileEdit from "../editProfile/EducationProfileEdit";
import styles from "./ProfileCard.module.css";
import { formatDate } from "../../../utils/formatDate";

export default function EducationCard() {
  const [educations, setEducations] = useState([
    {
      id: 1,
      degree: "JS Web Developer",
      institution: "SoftUni",
      startDate: "2009-09-01",
      endDate: "2024-11-30",
      isCurrent: true,
      description: "The program aims at people with professional experience who want to pursue a part-time bachelor's degree with a focus on management in parallel to their career."
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);

  const handleEditClick = (education) => {
    setCurrentEducation(education);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleSaveEducation = (updatedData) => {
    const updatedEducations = educations.map(exp => {
      if (exp.id === currentEducation.id) {
        return {
          ...updatedData,
          id: currentEducation.id
        };

      } else {
        return exp;
      }

    });

    setEducations(updatedEducations);


  };

  const handleRemoveEducation = (educationId) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this education?");

    if (isConfirmed) {
      const remainingEducations = educations.filter(education => education.id !== educationId);
      setEducations(remainingEducations);
    }
  }

  if (educations.length === 0) {
    return null; 
  }


  return (
    <>
    
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Education</h2>
       
        {educations.map((education) => (
          <div key={education.id} className={styles.timelineItem}>
            <div className={styles.timelineHeader}>
              <div>
                <h3 className={styles.timelineTitle}>{education.degree}</h3>
                <div className={styles.timelineSubtitle}>{education.institution}</div>
                <div className={styles.timelinePeriod}>
                  {formatDate(education.startDate)} - {education.isCurrent ? 'Present' : formatDate(education.endDate)}{" "}
                  {education.isCurrent && <span className={styles.currentBadge}>Current</span>}
                </div>
              </div>
            </div>
            <p className={styles.timelineDescription}>{education.description}</p>
            {/* isOwner button */}
            <div className={styles.buttonGroup}>
              <button
                className={styles.editProfileBtn}
                type="button"
                onClick={() => handleEditClick(education)}
              >
                Edit
              </button>
              <button
                className={styles.removeExperienceBtn}
                type="button"
                onClick={() => handleRemoveEducation(education.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Education Edit Modal */}
      {currentEducation && (
        <EducationProfileEdit
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          educationData={currentEducation}
          onSave={handleSaveEducation}
        />
      )}

   
    </>
  
  );
}
