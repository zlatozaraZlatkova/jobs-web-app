/* eslint-disable react/prop-types */
import styles from "./EditProfile.module.css";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useForm } from "../../../apiHooks/useForm";
import { useEditEmployeeProfile } from "../../../apiHooks/useEmployee";

export default function BasicProfileEdit({ isOpen, onClose, onSave, userData, refreshData }) {
  const [displayError, setDisplayError] = useState(null);
  const { isSubmitting, editBasicProfile, error } = useEditEmployeeProfile();

  const initialValues = {
    company: "",
    website: "",
    location: "",
    status: "",
    linkedin: "",
    githubUsername: "",
    bio: "",
    skills: "",
  };

  useEffect(() => {
    if (error) {
      setDisplayError(error);
    }
  }, [error]);

  const handleFormSubmit = async (formData) => {
    try {
      setDisplayError(null);

      const profileData = {
        company: formData.company,
        website: formData.website,
        location: formData.location,
        status: formData.status,
        linkedin: formData.linkedin,
        githubUsername: formData.githubUsername,
        bio: formData.bio,
        skills: Array.isArray(formData.skills)
          ? formData.skills.join(",")
          : formData.skills,
      };

      const updatedProfile = await editBasicProfile(profileData);

      if (onSave) {
        onSave(updatedProfile);
      }


      refreshData();

      onClose();

    } catch (err) {
      setDisplayError(err.message);
    }
  };

  const { formValues, setFormValues, changeHander, sumbitHandler, resetForm } =
    useForm(initialValues, handleFormSubmit);


  useEffect(() => {
    if (userData && isOpen) {

      const timer = setTimeout(() => {
        setFormValues({
          company: userData.company || "",
          website: userData.website || "",
          location: userData.location || "",
          status: userData.status || "",
          githubUsername: userData.githubUsername || "",
          linkedin: userData.socialMedia?.linkedin || "",
          skills: Array.isArray(userData.skills)
            ? userData.skills.join(",")
            : userData.skills || "",
          bio: userData.bio || "",
        });

        //console.log("Form values set");
      }, 10);

      return () => {
        clearTimeout(timer);
        if (!isOpen) {
          //console.log("Modal is unmounted");
        }
      };
    }
  }, [userData, isOpen, setFormValues]);

  const clickCancelHandle = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Profile"
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.header}>
        <h2>Edit Profile</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      {displayError && <div className="error-message">{displayError}</div>}
      <form onSubmit={sumbitHandler} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={formValues.company}
            onChange={changeHander}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="website">Website</label>
          <input
            type="url"
            name="website"
            value={formValues.website}
            onChange={changeHander}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={formValues.location}
            onChange={changeHander}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className="required">Status</label>
          <input
            type="text"
            name="status"
            value={formValues.status}
            onChange={changeHander}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="linkedin">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            value={formValues.linkedin}
            onChange={changeHander}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="github">GitHub URL</label>
          <input
            type="text"
            name="githubUsername"
            value={formValues.githubUsername}
            onChange={changeHander}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formValues.bio}
            onChange={changeHander}
            rows="4"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className="required">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formValues.skills}
            onChange={changeHander}
            required
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={clickCancelHandle}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving Changes" : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
