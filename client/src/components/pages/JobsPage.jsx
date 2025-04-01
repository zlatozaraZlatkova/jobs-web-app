import JobsListSection from "../jobsListSection/JobsListSection";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import styles from "../jobsListSection/JobsListSection.module.css";

import { useState, useEffect, useRef} from "react";
import { usePaginationWithURL } from "../../apiHooks/usePaginationWithURL";
import { useGetPaginatedJobs } from "../../apiHooks/useJobs";


export default function JobsPage() {
  const sectionRef = useRef(null);
  const { urlPageNumber, setUrlPageNumber, technologyFilter } = usePaginationWithURL();
  const { jobs, isLoading, totalPages, error } = useGetPaginatedJobs(urlPageNumber, technologyFilter);
  const [displayError, setDisplayError] = useState(null);
  const [updateJobList, setUpdatedJobList] = useState([]);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setUpdatedJobList(jobs);
    }
  }, [jobs]);

  const handleLocalSearch = (searchResults) => {
    setUpdatedJobList(searchResults);
  };

  useEffect(() => {
    if (error) {
      setDisplayError(error);
    }
  }, [error]);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [urlPageNumber]);

  const nextPage = () => {
    if (urlPageNumber < totalPages) {
      setUrlPageNumber(urlPageNumber + 1);
    }
  };

  const prevPage = () => {
    if (urlPageNumber > 1) {
      setUrlPageNumber(urlPageNumber - 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading open positions...</div>
      ) : (
        <>
          <section className={styles.featuredJobs} ref={sectionRef}>
            <div className={styles.container}>
              {displayError && (
                <div className="error-message">{displayError}</div>
              )}
              <div className={styles.searchbar}>
                <h2 className={styles.sectionTitle}>Find your next Position</h2>

                <SearchBar onSearch={handleLocalSearch} />
              </div>
            </div>
            <JobsListSection jobs={updateJobList} isLoading={isLoading} />

            <Pagination
              currentPage={urlPageNumber}
              totalPages={totalPages}
              onPrevPage={prevPage}
              onNextPage={nextPage}
            />
          </section>
        </>
      )}
    </>
  );
}
