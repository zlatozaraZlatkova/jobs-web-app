/* eslint-disable react/prop-types */
import styles from "./ProfileCard.module.css";

import { useGetGitHubProfile } from "../../../apiHooks/useEmployee";
import { useEffect, useState } from "react";

export default function GitHubRepo({ githubUsername }) {
  const [displayError, setDisplayError] = useState(null);
  const { profileRepo, isLoading, error } = useGetGitHubProfile(githubUsername);
  
  useEffect(() => {
    if (error) {
      setDisplayError(error);
    }
  }, [error]);

  const getFriendlyErrorMessage = (displayError) => {
    const errorText = displayError?.message || displayError || "";
    
    if (errorText.includes("Invalid data format")) {
      return "GitHub username not found or invalid";
    }
    
    return errorText || "An error occurred while fetching data";
  };


  return (
    <div className={styles.reposSection}>
      <h2 className={styles.sectionTitle}>GitHub Repos</h2>
      

      {displayError && (
        <div className={styles.errorMessage}>
          {getFriendlyErrorMessage(displayError)}
        </div>
      )}
      

      {isLoading && !displayError && (
        <div className="loading">Loading repositories...</div>
      )}
      

      {profileRepo && profileRepo.length > 0 && (
        profileRepo.map((repo) => (
          <div key={repo.id} className={styles.repoCard}>
            <div className={styles.repoHeader}>
              <h3 className={styles.repoTitle}>{repo.name}</h3>
              <span className={styles.repoVisibility}>{repo.visibility}</span>
            </div>
            <p className={styles.repoDescription}>{repo.description || "No description available"}</p>
            <div className={styles.repoMeta}>
              <span className={styles.repoMetaItem}>
                ⭐ {repo.stargazers_count} stars
              </span>
              <span className={styles.repoMetaItem}>
                🔄 {repo.forks_count} forks
              </span>
              {repo.language && (
                <span className={styles.repoMetaItem}>{repo.language}</span>
              )}
            </div>
          </div>
        ))
      )}
      
      {(!profileRepo || profileRepo.length === 0) && (
        <div>No repositories available</div>
      )}
    </div>
  );
}