/* eslint-disable react/prop-types */
import styles from "./EditProfile.module.css";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useForm } from "../../../apiHooks/useForm";
import { useEditEmployeeProfile } from "../../../apiHooks/useEmployee";

export default function BasicProfileEdit({ isOpen, onClose, onSave, userData, refreshData }) {
  const { isSubmitting, editBasicProfile, error } = useEditEmployeeProfile();
  const [serverError, setServerError] = useState(null);
  const [formErrors, setFormErrors] = useState(null);

  
  useEffect(() => {
    if (error) {
      setServerError(error);
      const timer = setTimeout(() => {
        setServerError(null);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  useEffect(() => {
    if (formErrors) {
      const timer = setTimeout(() => {
        setFormErrors(null);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [formErrors]);


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

  const validateForm = (formValues) => {
 
    if (!formValues.company && !formValues.location && 
      !formValues.status && !formValues.githubUsername && 
      !formValues.skills && !formValues.bio
      ) {
      setFormErrors("All fields are required");
      return false;
    }

    if (!formValues.company) {
      setFormErrors("Company name is required");
      return false;
    }
    if (formValues.company.length < 5) {
      setFormErrors("Company name must be at least 5 characters");
      return false;
    }

    if (!formValues.location) {
      setFormErrors("Location is required");
      return false;
    }

    if (formValues.location.length < 5) {
      setFormErrors("Location must be at least 5 characters");
      return false;
    }

    if (!formValues.status) {
      setFormErrors("Status is required");
      return false;
    }

    if (!formValues.githubUsername) {
      setFormErrors("GitHub username is required");
      return false;
    }

    if (formValues.skills.trim() === '') {
      setFormErrors("Tech skills are required");
      return false;
    }

    if (!formValues.bio) {
      setFormErrors("Short bio is required");
      return false;
    }

    if (formValues.bio.length < 5) {
      setFormErrors("Short bio must be at least 5 characters");
      return false;
    }

    setFormErrors(null);
    return true;
  };



  const handleFormSubmit = async (formData) => {
    setServerError(null);
    setFormErrors(null);

    if (!validateForm(formData)) {
      return;
    }

    try {


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
      setServerError(err.message);
    }
  };

  const { formValues, setFormValues, changeHandler, submitHandler, resetForm } =
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

        
      }, 10);

      return () => {
        clearTimeout(timer);
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
      
      {formErrors && <div className="error-message">{formErrors}</div>}
          {!formErrors && serverError && (
            <div className="error-message">{serverError}</div>
          )}

      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.formGroup}>
          <label className="required">Company</label>
          <input
            type="text"
            name="company"
            value={formValues.company}
            onChange={changeHandler}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className="required" htmlFor="website">Website</label>
          <input
            type="text"
            name="website"
            value={formValues.website}
            onChange={changeHandler}
          />
        </div>

        <div className={styles.formGroup}>
          <label className="required" htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={formValues.location}
            onChange={changeHandler}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className="required">Status</label>
          <input
            type="text"
            name="status"
            value={formValues.status}
            onChange={changeHandler}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className="required" htmlFor="linkedin">LinkedIn URL</label>
          <input
            type="text"
            name="linkedin"
            value={formValues.linkedin}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formGroup}>
          <label className="required"  htmlFor="github">GitHub URL</label>
          <input
            type="text"
            name="githubUsername"
            value={formValues.githubUsername}
            onChange={changeHandler}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className="required" htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formValues.bio}
            onChange={changeHandler}
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
            onChange={changeHandler}
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
