/* eslint-disable no-undef */
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
  console.log("params ID:", id);
  console.log("Get profile data by id:", employee);

  return (
    <>
      <div className="container-profile">
        {isLoading ? (
          <div>Loading employees...</div>
        ) : employee ? (
          <>
            <div className="profile-grid my-1">
              <div className="profile-about p-2">
                <BasicProfileCard employee={employee} isCVPage={true}/>
              </div>
              <div className="profile-exp p-2">
                <ExperienceCard employee={employee}  />
              </div>
              <div className="profile-edu  p-2">
                <EducationCard  employee={employee} />
              </div>
              <div className="profile-github">
                <GitHubRepo employee={employee}/>
              </div>
            </div>
          </>
        ) : (
          <div>No employee data available</div>
        )}
      </div>
    </>
  );
}
