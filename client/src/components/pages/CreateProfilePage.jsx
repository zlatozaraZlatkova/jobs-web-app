/* eslint-disable no-unused-vars */
import AddEducation from "../employee/addEducation/AddEducation";
import AddExperience from "../employee/addExperience/AddExperience";
import CreateProfile from "../employee/createProfile/CreateProfile";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetEmployeeProfile } from "../../apiHooks/useEmployee";

export default function CreateProfilePage() {
  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState(null);
  const [step, setStep] = useState(1);

  const { employee, isLoading, error, profileExists } = useGetEmployeeProfile();

  useEffect(() => {
    if (error) {
      setDisplayError(error);
      const timer = setTimeout(() => {
        setDisplayError(null);
      }, 10000);
  
      return () => {
        clearTimeout(timer);
      };
    }
   
  }, [error]);
 

  const handleProfileComplete = () => {
    navigate("/profile");
  };

  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onClickViewProfileBtn = () => {
    navigate("/profile");
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading your profile information...</p>
        </div>
      ) : (profileExists && employee && employee._id) ? (
        <div className="container-profile">
          {displayError && <div className="error-message">{displayError}</div>}
          <div className="profile-completion-message">
            <h2>Your Profile is Ready!</h2>
            <p>
              You&apos;ve successfully created your professional
              profile.
            </p>
            <p className="p-1">
              You can now apply for jobs, connect with employers, and showcase
              your skills.
            </p>
            <button type="button" 
             className="btn btn-primary"
             onClick={onClickViewProfileBtn}
             >
              View Your Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="container-profile">
          {/* Progress bar */}
          {displayError && <div className="error-message">{displayError}</div>}
          <div className="progress-steps">
            <div className="progress-line">
              <div
                className="progress-line-fill"
                style={{ width: `${(step - 1) * 50}%` }}
              ></div>
            </div>

            <div
              className={`step ${step >= 1 ? (step > 1 ? "completed" : "active") : ""
                }`}
            >
              <div className="step-circle">
                {step > 1 ? <span>✓</span> : <span>1</span>}
              </div>
              <div className="step-label">Profile</div>
            </div>

            <div
              className={`step ${step >= 2 ? (step > 2 ? "completed" : "active") : ""
                }`}
            >
              <div className="step-circle">
                {step > 2 ? <span>✓</span> : <span>2</span>}
              </div>
              <div className="step-label">Experience</div>
            </div>

            <div
              className={`step ${step >= 3 ? (step > 3 ? "completed" : "active") : ""
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
