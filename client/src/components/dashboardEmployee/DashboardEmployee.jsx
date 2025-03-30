import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGetEmployeeProfile } from "../../apiHooks/useEmployee";
import BasicProfileCard from "../employee/detailsProfile/BasicProfileCard";
import EducationCard from "../employee/detailsProfile/EducationCard";
import ExperienceCard from "../employee/detailsProfile/ExperienceCard";
import GitHubRepo from "../employee/detailsProfile/GitHubRepo";

export default function DashboardEmployee() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [displayError, setDisplayError] = useState(null);
  const { employee, isLoading, error, refreshData } = useGetEmployeeProfile();

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
            <header className="profile-dashboard-header">
              <div className="profile-tab-nav">
                <button
                  className={`${"profile-tab-button"} ${
                    activeTab === "overview" ? activeTab : ""
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`${"profile-tab-button"} ${
                    activeTab === "jobs" ? activeTab : ""
                  }`}
                  onClick={() => setActiveTab("jobs")}
                >
                  Pinned Jobs
                </button>
              </div>
            </header>
            <div className="profile-dashboard-content">
              {activeTab === "overview" && (
                <div className="profile-overview-section">
                  <div className="profile-summary-card">
                    <div className="profile-summary-value">
                      <BasicProfileCard
                        employee={employee}
                        refreshData={refreshData}
                      />
                      <div className="content-grid">
                        {employee?.experience &&
                          employee.experience.length > 0 && (
                            <ExperienceCard
                              experienceData={employee.experience}
                            />
                          )}
                        {employee?.education &&
                          employee.education.length > 0 && (
                            <EducationCard educationData={employee.education} />
                          )}
                      </div>
                      <GitHubRepo githubUsername={employee.githubUsername} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "jobs" && (
                <div>
                  {employee.pinnedJobList &&
                  employee.pinnedJobList.length > 0 ? (
                    <div className="profile-table-container">
                      <table className="profile-date-table">
                        <thead>
                          <tr>
                            <th>Position</th>
                            <th>Tech Stack</th>
                            <th>Location</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employee.pinnedJobList.map((job) => (
                            <tr key={job._id}>
                              <td>{job.title}</td>
                              <td>{job.techStack}</td>
                              <td>{job.location}</td>
                              <td>
                                <div className="profile-table-actions">
                                  <Link
                                    to={`/jobs/${job._id}`}
                                    className="profile-action-button"
                                  >
                                    <i className="fas fa-eye"></i>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>No jobs have been pinned yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div>No employee data available. Please create your profile</div>
        )}
      </div>
    </>
  );
}
