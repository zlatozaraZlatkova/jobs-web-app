import { useNavigate } from "react-router-dom";
import { useGetEmployeeProfile } from "../../apiHooks/useEmployee";
import BasicProfileCard from "../employee/detailsProfile/BasicProfileCard";
import EducationCard from "../employee/detailsProfile/EducationCard";
import ExperienceCard from "../employee/detailsProfile/ExperienceCard";
import GitHubRepo from "../employee/detailsProfile/GitHubRepo";


export default function DetailsProfilePage() {
  const navigate = useNavigate();
  const { employee, isLoading, error } = useGetEmployeeProfile();
  console.log("Get profile data from useProfile", employee);

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
            {/* {displayError && <div className="error-message">{displayError}</div>} */}
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
            <BasicProfileCard employee={employee} />
            <div className="content-grid">
              <ExperienceCard employee={employee} />
              <EducationCard employee={employee} />
            </div>
            <GitHubRepo />
          </>
        ) : (
          <div>No employee data available. Please create your profile</div>
        )}
      </div>
    </>
  );
}
