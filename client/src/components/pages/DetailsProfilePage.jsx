import BasicProfileCard from "../employee/detailsProfile/BasicProfileCard";
import EducationCard from "../employee/detailsProfile/EducationCard";
import ExperienceCard from "../employee/detailsProfile/ExperienceCard";
import GitHubRepo from "../employee/detailsProfile/GitHubRepo";
import { useGetEmployeeProfile } from "../../apiHooks/useEmployee";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailsProfilePage() {
  const navigate = useNavigate();
  const { employee, isLoading, error, refreshData } = useGetEmployeeProfile();
  const [displayError, setDisplayError] = useState(null);

  useEffect(() => {
    if (error) {
      setDisplayError(error);
    }
  }, [error]);

  const onClickCreateProfileBtn = () => {
    navigate("/profile/create");
  };

  return (
    <>
      <div className="container-profile">
        {isLoading ? (
          <div>Loading employees...</div>
        ) : error ? (
          <div className="container-profile">
            {displayError && (
              <div className="error-message">{displayError}</div>
            )}
            <div className="profile-completion-message">
              <h2>You&apos;re on the right track!</h2>
              <p>Complete your professional profile to move forward.</p>
              <p className="p-1">
                Once your CV is ready, you can apply for jobs, connect with
                employers, and showcase your skills effectively.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClickCreateProfileBtn}
              >
                Create Profile
              </button>
            </div>
          </div>
        ) : employee ? (
          <>
            <BasicProfileCard employee={employee} refreshData={refreshData} />
            <div className="content-grid">
              {employee?.experience && employee.experience.length > 0 && (
                <ExperienceCard experienceData={employee.experience} />
              )}
              {employee?.education && employee.education.length > 0 && (
                <EducationCard educationData={employee.education} />
              )}
            </div>
            <GitHubRepo githubUsername={employee.githubUsername} />
          </>
        ) : (
          <div>No employee data available. Please create your profile</div>
        )}
      </div>
    </>
  );
}
