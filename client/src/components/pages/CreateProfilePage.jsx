/* eslint-disable no-unused-vars */
import AddEducation from "../employee/addEducation/AddEducation";
import AddExperience from "../employee/addExperience/AddExperience";
import CreateProfile from "../employee/createProfile/CreateProfile";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetEmployeeProfile } from "../../apiHooks/useEmployee";

export default function CreateProfilePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const { employee, isLoading } = useGetEmployeeProfile();
 
  const handleProfileComplete = () => {
    navigate("/profile");
  };

  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading your profile information...</p>
        </div>
      ) : employee ? (
        <div className="container-profile">
          <div className="profile-completion-message">
            <h2>Your Profile is Ready!</h2>
            <p>
              You&apos;ve successfully created your professional
              profile.
            </p>
            <p>
              You can now apply for jobs, connect with employers, and showcase
              your skills.
            </p>
            <Link to={"/profile"} className="view-profile-btn">
              View Your Profile
            </Link>
          </div>
        </div>
      ) : (
        <div className="container-profile">
          {/* Progress bar */}
          <div className="progress-steps">
            <div className="progress-line">
              <div
                className="progress-line-fill"
                style={{ width: `${(step - 1) * 50}%` }}
              ></div>
            </div>

            <div
              className={`step ${
                step >= 1 ? (step > 1 ? "completed" : "active") : ""
              }`}
            >
              <div className="step-circle">
                {step > 1 ? <span>✓</span> : <span>1</span>}
              </div>
              <div className="step-label">Profile</div>
            </div>

            <div
              className={`step ${
                step >= 2 ? (step > 2 ? "completed" : "active") : ""
              }`}
            >
              <div className="step-circle">
                {step > 2 ? <span>✓</span> : <span>2</span>}
              </div>
              <div className="step-label">Experience</div>
            </div>

            <div
              className={`step ${
                step >= 3 ? (step > 3 ? "completed" : "active") : ""
              }`}
            >
              <div className="step-circle">
                {step > 3 ? <span>✓</span> : <span>3</span>}
              </div>
              <div className="step-label">Education</div>
            </div>
          </div>

 
          {step === 1 && (
            <CreateProfile 
            onComplete={goToNextStep} />)
          }

          {step === 2 && (
            <AddExperience
              onBack={goToPreviousStep}
              onComplete={goToNextStep}
            />
          )}

          {step === 3 && (
            <AddEducation
              onBack={goToPreviousStep}
              onComplete={handleProfileComplete}
            />
          )}
        </div>
      )}
    </>
  );
}
