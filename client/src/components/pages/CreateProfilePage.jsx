/* eslint-disable no-unused-vars */
import AddEducation from "../employee/addEducation/AddEducation";
import AddExperience from "../employee/addExperience/AddExperience";
import CreateProfile from "../employee/createProfile/CreateProfile";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function CreateProfilePage() {
 
  const [step, setStep] = useState(1);
  
 
  const handleProfileSubmit = (profileData) => {
    setStep(2);
  };
  

  const handleExperienceSubmit = (experienceData) => {
    setStep(3);
  };
  
  
  const handleEducationSubmit = (educationData) => {
    setStep(4);
  };
  
  return (
    <div className="container">
      {/* Progress bar */}
      <div className="progress-steps">
        <div className="progress-line">
          <div 
            className="progress-line-fill" 
            style={{ width: `${(step-1) * 50}%` }} 
          ></div>
        </div>
        
        {/* Step circles */}
        <div className={`step ${step > 1 ? "completed" : "active"}`}>
          <div className="step-circle">
            {step > 1 ? <span>✓</span> : <span>1</span>}
          </div>
          <div className="step-label">Profile</div>
        </div>
        
        <div className={`step ${step > 2 ? "completed" : step === 2 ? "active" : ""}`}>
          <div className="step-circle">
            {step > 2 ? <span>✓</span> : <span>2</span>}
          </div>
          <div className="step-label">Experience</div>
        </div>
        
        <div className={`step ${step > 3 ? "completed" : step === 3 ? "active" : ""}`}>
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
        />
      )}
      
      {step === 2 && (
        <AddExperience 
          onSubmit={handleExperienceSubmit}
          onBack={() => setStep(1)}
        />
      )}
      
      {step === 3 && (
        <AddEducation 
          onSubmit={handleEducationSubmit}
          onBack={() => setStep(2)}
        />
      )}
      
      {step === 4 && (
        <div className="profile-completion-message">
          <h2>Profile Completed!</h2>
          <p>Thank you for completing your profile.</p>
          <Link to={"/profile"}>View Profile</Link>
        </div>
      )}
    </div>
  );
}

