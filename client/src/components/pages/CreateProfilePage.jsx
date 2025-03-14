/* eslint-disable no-unused-vars */
import AddEducation from "../employee/addEducation/AddEducation";
import AddExperience from "../employee/addExperience/AddExperience";
import CreateProfile from "../employee/createProfile/CreateProfile";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEducationApi, useExperienceApi, useProfileApi } from "../../apiHooks/useEmployee";

export default function CreateProfilePage() {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [educationData, setEducationData] = useState(null);

  const { submitProfile, isSubmittingProfile } = useProfileApi();
  const { submitExperience, isSubmittingExperience } = useExperienceApi();
  const { submitEducation, isSubmittingEducation } = useEducationApi();

  const handleProfileSubmit = async (formData) => {
    const basicProfile = await submitProfile(formData);

    if (basicProfile) {
      setProfileData(basicProfile);
      setStep(2);
    }
  };

  const handleExperienceSubmit = async (formData) => {
    if (!profileData) {
      console.error("Profile must be created first");
      setStep(1);
      return;
    }

    const experience = await submitExperience(formData);
    if (experience) {
      setExperienceData(experience);
      setStep(3);
    }
  };

  const handleEducationSubmit = async (formData) => {
    if (!experienceData) {
      console.error("Experience must be created first");
      setStep(2);
      return;
    }
    const education = await submitEducation(formData);
    if(education) {
      setEducationData(education);
      setStep(4);
    }

   
  };

  return (
    <div className="container-profile">
      {/* Progress bar */}
      <div className="progress-steps">
        <div className="progress-line">
          <div
            className="progress-line-fill"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>
        </div>

        {/* Step circles */}
        <div className={`step ${step > 1 ? "completed" : "active"}`}>
          <div className="step-circle">
            {step > 1 ? <span>✓</span> : <span>1</span>}
          </div>
          <div className="step-label">Profile</div>
        </div>

        <div
          className={`step ${
            step > 2 ? "completed" : step === 2 ? "active" : ""
          }`}
        >
          <div className="step-circle">
            {step > 2 ? <span>✓</span> : <span>2</span>}
          </div>
          <div className="step-label">Experience</div>
        </div>

        <div
          className={`step ${
            step > 3 ? "completed" : step === 3 ? "active" : ""
          }`}
        >
          <div className="step-circle">
            {step > 3 ? <span>✓</span> : <span>3</span>}
          </div>
          <div className="step-label">Education</div>
        </div>
      </div>

      {/* Forms */}
      {step === 1 && (
        <CreateProfile
          onSubmit={handleProfileSubmit}
          isSubmitting={isSubmittingProfile}
        />
      )}

      {step === 2 && (
        <AddExperience
          onSubmit={handleExperienceSubmit}
          onBack={() => setStep(1)}
          isSubmitting={isSubmittingExperience}
        />
      )}

      {step === 3 && (
        <AddEducation
          onSubmit={handleEducationSubmit}
          onBack={() => setStep(2)}
          isSubmitting={isSubmittingEducation}
        />
      )}

      {step === 4 && educationData && (
        <div className="profile-completion-message">
          <h2>Profile Completed!</h2>
          <p>Thank you for completing your profile.</p>
          <Link to={"/profile"}>View Profile</Link>
        </div>
      )}
    </div>
  );
}

