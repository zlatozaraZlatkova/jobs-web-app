/* eslint-disable no-unused-vars */
import AddEducation from "../employee/addEducation/AddEducation";
import AddExperience from "../employee/addExperience/AddExperience";
import CreateProfile from "../employee/createProfile/CreateProfile";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createEmployeeProfile, addEmployeeExperience, addEmployeeEducation } from "../../api/eployeeApi";


export default function CreateProfilePage() {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [educationData, setEducationData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const handleProfileSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const basicProfile = await createEmployeeProfile(data);
      setProfileData(basicProfile);

      setStep(2);

    } catch (err) {
      console.error("Failed to create basic profile. Please try again.", err);
    }finally{
      setIsSubmitting(false);
    }
   
  };
  
  
  const handleExperienceSubmit = async(formData) => {
    if (!profileData) {
      console.error("Profile must be created first");
      setStep(1); 
      return;
    } 

    try {
      setIsSubmitting(true);
      const expData = await addEmployeeExperience(formData);
      setExperienceData(expData);

      setStep(3);

    } catch (err) {
      console.error("Failed to save experience. Please try again.", err);
    }finally{
      setIsSubmitting(false);
    }
   
  };
  
  
  const handleEducationSubmit = async(formData) => {
    if (!experienceData) {
      console.error("Experience must be created first");
      setStep(2); 
      return;
    }

    try {
      setIsSubmitting(true);
      const educationData = await addEmployeeEducation(formData);
      setEducationData(educationData);

      setStep(4);

    } catch (err) {
      console.error("Failed to save education. Please try again.", err);
    }finally{
      setIsSubmitting(false);
    }
    
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
          isSubmitting={isSubmitting}
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

