import { useState } from "react";
import ExperienceProfileEdit from "../editProfile/ExperienceProfileEdit";
import styles from "./ProfileCard.module.css";
import { formatDate } from "../../../utils/formatDate";


export default function ExperienceCard() {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Oracle",
      startDate: "2009-10-01",
      endDate: "",
      isCurrent: true,
      description: "High quality awareness as well as willingness to learn and openness for new technologies. Leading development of cloud-based enterprise applications."
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "Google",
      startDate: "2007-01-01",
      endDate: "2009-09-30",
      isCurrent: false,
      description: "Developed and maintained multiple web applications using React and Node.js. Collaborated with UX team to improve user experience and accessibility."
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);


  const handleEditClick = (experience) => {
    setCurrentExperience(experience);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleSaveExperience = (updatedData) => {

    const updatedExperiences = experiences.map(exp => {
      if (exp.id === currentExperience.id) {
        return {
          ...updatedData,
          id: currentExperience.id
        };

      } else {
        return exp;
      }

    });
    setExperiences(updatedExperiences);


  };

  const handleRemoveExperience = (experienceId) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this experience?");

    if (isConfirmed) {
      const remainingExperiences = experiences.filter(experience => experience.id !== experienceId);
      setExperiences(remainingExperiences);
    }
  }

  if (experiences.length === 0) {
    return null; 
  }

  return (
    <>
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Experience</h2>

        {experiences.map((experience) => (
          <div key={experience.id} className={styles.timelineItem}>
            <div className={styles.timelineHeader}>
              <div>
                <h3 className={styles.timelineTitle}>
                  {experience.title}
                </h3>
                <div className={styles.timelineSubtitle}>{experience.company}</div>
                <div className={styles.timelinePeriod}>
                  {formatDate(experience.startDate)} - {experience.isCurrent ? "Present" : formatDate(experience.endDate)}{" "}
                  {experience.isCurrent && <span className={styles.currentBadge}>Current</span>}
                </div>
              </div>
            </div>
            <p className={styles.timelineDescription}>
              {experience.description}
            </p>
            {/* isOwner button */}
            <div className={styles.buttonGroup}>
              <button
                className={styles.editProfileBtn}
                type="button"
                onClick={() => handleEditClick(experience)}
              >
                Edit
              </button>
              <button
                className={styles.removeExperienceBtn}
                type="button"
                onClick={() => handleRemoveExperience(experience.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Experience Edit Modal */}
      {currentExperience && (
        <ExperienceProfileEdit
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          experienceData={currentExperience}
          onSave={handleSaveExperience}
        />
      )}
    </>
  );
}
