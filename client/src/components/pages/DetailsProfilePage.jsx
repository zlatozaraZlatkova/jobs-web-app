import BasicProfileCard from "../employee/detailsProfile/BasicProfileCard";
import EducationCard from "../employee/detailsProfile/EducationCard";
import ExperienceCard from "../employee/detailsProfile/ExperienceCard";
import GitHubRepo from "../employee/detailsProfile/GitHubRepo";
import { useGetEmployeeProfile } from "../../apiHooks/useEmployee";

export default function DetailsProfilePage() {
 const { profile, isLoading} = useGetEmployeeProfile();

  return (
    <>
      <div className="container">
        {isLoading ? (
          <div>Loading employees...</div>
        ) : (
          <>
            <BasicProfileCard employee={profile} />
            <GitHubRepo />
            <div className="content-grid">
              <ExperienceCard />
              <EducationCard />
            </div>
          </>
        )}
      </div>
    </>
  );
}
