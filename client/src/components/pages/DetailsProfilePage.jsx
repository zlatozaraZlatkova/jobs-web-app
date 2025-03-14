import BasicProfileCard from "../employee/detailsProfile/BasicProfileCard";
import EducationCard from "../employee/detailsProfile/EducationCard";
import ExperienceCard from "../employee/detailsProfile/ExperienceCard";
import GitHubRepo from "../employee/detailsProfile/GitHubRepo";
import { useGetEmployeeProfile } from "../../apiHooks/useEmployee";

export default function DetailsProfilePage() {
 const { employee, isLoading } = useGetEmployeeProfile();
  
 return (
    <>
      <div className="container-profile">
        {isLoading ? (
          <div>Loading employees...</div>
        ) : employee ? (
          <>
            <BasicProfileCard employee={employee} />
            <GitHubRepo />
            <div className="content-grid">
              <ExperienceCard />
              <EducationCard />
            </div>
          </>
        ) : (
          <div>No employee data available</div>
        )}
      </div>
    </>
  );
}
