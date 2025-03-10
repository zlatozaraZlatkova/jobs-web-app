/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./JobsListSection.module.css";
import JobCard from "./jobCard/JobCard";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import { getPaginatedJobs } from "../../api/jobsApi";

export default function JobsListSection({ isHomePage = false }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fecthJobs = async () => {
      try {
        setIsLoading(true);
        const result = await getPaginatedJobs(currentPage);

        if (result.data && Array.isArray(result.data.items)) {
          setJobs(result.data.items);
          setTotalPages(result.data.pagination.totalPages);
        } else {
          setJobs([]);
        }
        
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fecthJobs();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      if (sectionRef.current) {
        sectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      }

      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      if (sectionRef.current) {
        sectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      }

      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  return (
    <>
      <section className={styles.featuredJobs} ref={sectionRef}>
        <div className={styles.container}>
          {isHomePage ? (
            <h2 className={styles.sectionTitle}>Featured Positions</h2>
          ) : (
            <div className={styles.searchbar}>
              <h2 className={styles.sectionTitle}>Find your next Position</h2>
              {!isHomePage && <SearchBar />}
            </div>
          )}

          <div className={styles.jobsGrid}>
            {isLoading ? (
              <div>Loading open positions...</div>
            ) : (
              <>
                {jobs && jobs.length > 0 ? (
                  <>
                    {jobs.map((job) => (
                      <JobCard key={job._id} job={job} />
                    ))}
                  </>
                ) : (
                  <div>No jobs found.</div>
                )}
              </>
            )}
          </div>
          {isHomePage ? (
            <div className="text-center">
              <Link to={"/jobs"} className="btn btn-primary">
                Explore More
              </Link>
            </div>
          ) : (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={prevPage}
              onNextPage={nextPage}
            />
          )}
        </div>
      </section>
    </>
  );
}
