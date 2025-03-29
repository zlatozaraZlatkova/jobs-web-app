/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useGetEmployeeProfileById } from "../../apiHooks/useEmployee";
import BasicProfileCard from "../employee/detailsProfile/BasicProfileCard";
import EducationCard from "../employee/detailsProfile/EducationCard";
import ExperienceCard from "../employee/detailsProfile/ExperienceCard";
import GitHubRepo from "../employee/detailsProfile/GitHubRepo";

export default function CVPage() {
  const { id } = useParams();
  const { employee, isLoading } = useGetEmployeeProfileById(id);

  return (
    <>
      <div className="container-profile">
        {isLoading ? (
          <div>Loading employees...</div>
        ) : employee ? (
          <>
            <div className="profile-grid my-1">
              <div className="profile-about p-2">
                <BasicProfileCard employee={employee} isCVPage={true} />
              </div>
              {employee?.experience && employee.experience.length > 0 && (
                <div className="profile-exp p-2">
                  <ExperienceCard experienceData={employee.experience} />
                </div>
              )}

              {employee?.education && employee.education.length > 0 && (
                <div className="profile-edu p-2">
                  <EducationCard educationData={employee.education} />
                </div>
              )}
              {employee?.githubUsername ? (
                 <div className="profile-github">
                 <GitHubRepo githubUsername={employee.githubUsername} />
               </div>
              ): (<>
                <div>No username provided</div>
              </>)}
             
            </div>
          </>
        ) : (
          <div>No employee data available</div>
        )}
      </div>
    </>
  );
}
