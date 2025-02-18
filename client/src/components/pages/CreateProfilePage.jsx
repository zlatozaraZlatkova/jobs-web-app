/* eslint-disable no-unused-vars */
import AddEducation from "../employee/addEducation/AddEducation";
import AddExperience from "../employee/addExperience/AddExperience";
import CreateProfile from "../employee/createProfile/CreateProfile";
import { useState } from "react";

export default function CreateProfilePage() {
  const [hasProfile, setHasProfile] = useState(true);
  const [hasExperience, setHasExperience] = useState(true);
  const [hasEducation, setHasEducation] = useState(false);

  return (
    <>

      <div className="container">
        <div className="progress-steps">

          <div className="progress-line">
          {!hasExperience ? (
              <div className="progress-line-fill" style={{width: hasProfile ? "50%": "0%"}}></div>
            ): (<div className="progress-line-fill" style={{width: hasExperience ? "100%": "50%"}}></div>)}
            
          </div>

          {/* Step 1 */}
          <div className={`step ${hasProfile ? "completed" : "active"}`}>
            <div className="step-circle">
              {hasProfile ? (
                <span className="step-number">✓</span>
              ) : (
                <span className="step-number">1</span>
              )}
            </div>
            <div className="step-label">Profile Info</div>
          </div>

          {/* Step 2 */}
          <div
            className={`step ${hasExperience ? "completed" : hasProfile ? "active" : ""}`}>
            <div className="step-circle">
              {hasExperience ? (
                <span className="step-number">✓</span>
              ) : (
                <span className="step-number">2</span>
              )}
            </div>
            <div className="step-label">Experience</div>
          </div>

          {/* Step 3 */}
          <div
            className={`step ${hasEducation ? "completed" : hasExperience ? "active" : ""}`}>
            <div className="step-circle">
              {hasEducation ? (
                <span className="step-number">✓</span>
              ) : (
                <span className="step-number">3</span>
              )}
            </div>
            <div className="step-label">Education</div>
          </div>
        </div>


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
