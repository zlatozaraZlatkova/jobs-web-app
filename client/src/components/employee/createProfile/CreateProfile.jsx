/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useForm } from "../../../apiHooks/useForm";
import { useProfileApi } from "../../../apiHooks/useEmployee";


export default function CreateProfile({ onComplete }) {
  const { submitProfile, isSubmittingProfile, error } = useProfileApi();

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
    githubUsername: "",
    linkedinProfile: "",
    skills: "",
    bio: "",
  };


  const validateForm = (formValues) => {
 
    if (!formValues.company &&
       !formValues.location && !formValues.status &&
       !formValues.githubUsername && !formValues.skills &&
       !formValues.bio
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

    if (!formValues.skills) {
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
      const basicProfileInputData = {
        company: formData.company,
        website: formData.website,
        location: formData.location,
        status: formData.status,
        githubUsername: formData.githubUsername,
        linkedin: formData.linkedin,
        skills: formData.skills,
        bio: formData.bio,
      }

      const basicProfile = submitProfile(basicProfileInputData);
      //console.log("Response basic profile data:", basicProfile);

      if (basicProfile && onComplete) {
        onComplete();
      }

    } catch (err) {
      setServerError(err.message);

    }
  }

  const { formValues, changeHandler, submitHandler, resetForm } = useForm(initialValues, handleFormSubmit);

  const clickCancelHandle = () => {
    resetForm();
  };


  return (
    <>
      <div className="form-card">
        <h1 className="form-title">Create Your Professional Profile</h1>
      
        {formErrors && <div className="error-message">{formErrors}</div>}
          {!formErrors && serverError && (
            <div className="error-message">{serverError}</div>
          )}
        <form onSubmit={submitHandler}>
          <div className="form-grid">
            <div className="form-group">
              <label className="required">Company</label>
              <input
                type="text"
                name="company"
                value={formValues.company}
                onChange={changeHandler}
                placeholder="e.g. Tech Solutions Inc."
              />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={formValues.website}
                onChange={changeHandler}
                placeholder="www.example.com" 
              />

            </div>
            <div className="form-group">
              <label className="required">Location</label>
              <input
                type="text"
                name="location"
                value={formValues.location}
                onChange={changeHandler}
                placeholder="e.g. London, UK"
              />

            </div>
            <div className="form-group">
              <label className="required">Status</label>
              <input
                type="text"
                name="status"
                value={formValues.status}
                onChange={changeHandler}
                placeholder="e.g. Looking for opportunities"
              />

            </div>
            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                value={formValues.linkedin}
                onChange={changeHandler}
                placeholder="https://www.linkedin.com/in/username"
              />
            </div>
            <div className="form-group">
              <label className="required">GitHub Profile</label>
              <input
                type="text"
                name="githubUsername"
                value={formValues.githubUsername}
                onChange={changeHandler}
                placeholder="username"
              />

            </div>
            <div className="form-group form-grid-full">
              <label className="required">Skills</label>
              <input
                type="text"
                name="skills"
                value={formValues.skills}
                onChange={changeHandler}
                placeholder="eg. HTML, CSS, JavaScript, React"
              />

            </div>
            <div className="form-group form-grid-full">
              <label className="required">Bio</label>
              <textarea
                name="bio"
                value={formValues.bio}
                onChange={changeHandler}
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
