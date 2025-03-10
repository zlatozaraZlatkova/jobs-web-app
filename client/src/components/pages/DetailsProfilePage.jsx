import BasicProfileCard from "../employee/detailsProfile/BasicProfileCard";
import EducationCard from "../employee/detailsProfile/EducationCard";
import ExperienceCard from "../employee/detailsProfile/ExperienceCard";
import GitHubRepo from "../employee/detailsProfile/GitHubRepo";
import { getEmployeeProfile } from "../../api/eployeeApi";
import { useState, useEffect } from "react";

export default function DetailsProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const result = await getEmployeeProfile();

        //the response structure is { success, data: { items: [] } }
        if (!result.data || !Array.isArray(result.data.items)) {
          setProfile(null);
          return;
        }

        setProfile(result.data.items);
      } catch (err) {
        console.error("Error fetching employee profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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
