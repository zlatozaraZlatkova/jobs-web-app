import SearchBar from "../searchBar/SearchBar";
import CategoriesJobSection from "../categoriesJobSection/CategoriesJobSection";
import JobsListSection from "../jobsListSection/JobsListSection";
import TrustedCompaniesSection from "../trustedCompaniesSection/TrustedCompaniesSection";

import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import { useFeaturedJobs } from "../../apiHooks/useJobs";

export default function HomePage() {
  const { jobs, isLoading } = useFeaturedJobs();
  const featuredJobs = jobs && jobs.length > 0 ? jobs.slice(0, 3) : [];

  const navigate = useNavigate();
  const { setSearchContextResults, resetContextSearch } = useContext(SearchContext);

  const handleSearchAndNavigate = (results) => {
    setSearchContextResults(results);
    navigate("/jobs");
  };

  useEffect(() => {
    resetContextSearch();
  }, []);


  return (
    <>
      <section className="search-section">
        <h1>GET HIRED &amp; BUILD A STRONG TEAM</h1>
        <p>Advance your career and build a strong, successful team.</p>

        <SearchBar onSearch={handleSearchAndNavigate} />
      </section>

      <CategoriesJobSection />
      <section className="featured-jobs-section">
        <JobsListSection jobs={featuredJobs} isLoading={isLoading} />

        <div className="text-center">
          <Link to={"/jobs"} className="btn btn-primary">
            Explore More
          </Link>
        </div>
      </section>

      <TrustedCompaniesSection />
    </>
  );
}
