/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useForm } from "../../../apiHooks/useForm";
import { useProfileApi } from "../../../apiHooks/useEmployee";


export default function CreateProfile({ onComplete }) {
  const [displayError, setDisplayError] = useState(null);
  const { submitProfile, isSubmittingProfile, error } = useProfileApi();

  useEffect(() => {
    if (error) {
      setDisplayError(error);
    }
  }, [error]);

  const initialValues = {
    fullName: "",
    company: "",
    website: "",
    location: "",
    status: "",
    linkedinProfile: "",
    skills: "",
    bio: "",
  };

  const handleFormSubmit = async (formData) => {
    try {
      setDisplayError(null);
      console.log("Submitting basic profile data:", formData);

      const basicProfileInputData = {
        fullName: formData.fullName,
        company: formData.company,
        website: formData.website,
        location: formData.location,
        status: formData.status,
        linkedinProfile: formData.linkedinProfile,
        skills: formData.skills,
        bio: formData.bio,
      }

      const basicProfile = submitProfile(basicProfileInputData);
      
      console.log("Response basic profile data:", basicProfile);

      if (basicProfile && onComplete) {
        onComplete();
      }

    } catch (err) {
      console.log("Error message:", err.message);
      setDisplayError(err.message);

    }
  }

  const { formValues, changeHander, sumbitHandler, resetForm } = useForm(initialValues, handleFormSubmit);

  const clickCancelHandle = () => {
    resetForm();
  };


  return (
    <>
      <div className="form-card">
        <h1 className="form-title">Create Your Professional Profile</h1>
        {displayError && <div className="error-message">{displayError}</div>}
        <form onSubmit={sumbitHandler}>
          <div className="form-grid">
            <div className="form-group">
              <label className="required">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formValues.fullName}
                onChange={changeHander}
                placeholder="e.g. John Doe"
              />

            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={formValues.company}
                onChange={changeHander}
                placeholder="e.g. Tech Solutions Inc."
              />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formValues.website}
                onChange={changeHander}
                placeholder="www.example.com"
              />

            </div>
            <div className="form-group">
              <label className="required">Location</label>
              <input
                type="text"
                name="location"
                value={formValues.location}
                onChange={changeHander}
                placeholder="e.g. London, UK"
              />

            </div>
            <div className="form-group">
              <label className="required">Status</label>
              <input
                type="text"
                name="status"
                value={formValues.status}
                onChange={changeHander}
                placeholder="e.g. Looking for opportunities"
              />

            </div>
            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="url"
                name="linkedinProfile"
                value={formValues.linkedinProfile}
                onChange={changeHander}
                placeholder="www.linkedin.com/in/username"
              />

            </div>
            <div className="form-group form-grid-full">
              <label className="required">Skills</label>
              <input
                type="text"
                name="skills"
                value={formValues.skills}
                onChange={changeHander}
                placeholder="eg. HTML, CSS, JavaScript, React"
              />

            </div>
            <div className="form-group form-grid-full">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formValues.bio}
                onChange={changeHander}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
          <div className="button-group">
            <button
              type="button"
              className="button button-secondary"
              onClick={clickCancelHandle}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="create-profile-btn"
              disabled={isSubmittingProfile}
            >
              {isSubmittingProfile ? "Creating Profile..." : "Create Profile"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
