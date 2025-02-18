/* eslint-disable no-unused-vars */
import AddEducation from "../employee/addEducation/AddEducation";
import AddExperience from "../employee/addExperience/AddExperience";
import CreateProfile from "../employee/createProfile/CreateProfile";
import { useState } from "react";

export default function CreateProfilePage() {
  const [hasProfile, setHasProfile] = useState(false);
  const [hasExperience, setHasExperience] = useState(false);
  const [hasEducation, setHasEducation] = useState(false);

  return (
    <>
      <div className="container">
        <>
          {/* Progress Steps */}
          <div className="progress-steps">
            <div className="progress-line">
              <div className="progress-line-fill" />
            </div>
            <div className="step active">
              <div className="step-circle">1</div>
              <div className="step-label">Profile Info</div>
            </div>
            <div className="step">
              <div className="step-circle">2</div>
              <div className="step-label">Experience</div>
            </div>
            <div className="step">
              <div className="step-circle">3</div>
              <div className="step-label">Education</div>
            </div>
          </div>
        </>
        
        {/* Forms layout */}
        <div>
          {!hasProfile && (
            <CreateProfile onComplete={() => setHasProfile(true)} />
          )}

          {hasProfile && !hasExperience && (
            <AddExperience onComplete={() => setHasExperience(true)} />
          )}

          {hasProfile && hasExperience && (
            <AddEducation onComplete={() => setHasEducation(true)} />
          )}
        </div>
      </div>
    </>
  );
}
