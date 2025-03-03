import BasicProfileCard from "../employee/detailsProfile/BasicProfileCard";
import EducationCard from "../employee/detailsProfile/EducationCard";
import ExperienceCard from "../employee/detailsProfile/ExperienceCard";
import GitHubRepo from "../employee/detailsProfile/GitHubRepo";

export default function DetailsProfilePage() {
  return (
    <>
      <div className="container">
        <BasicProfileCard />
        <GitHubRepo/>
        <div className="content-grid">
          <ExperienceCard />
          <EducationCard />
        </div>
      </div>
    </>
  );
}
