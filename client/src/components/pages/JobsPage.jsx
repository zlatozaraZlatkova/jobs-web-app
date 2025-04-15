/* eslint-disable no-unused-vars */
import JobsListSection from "../jobsListSection/JobsListSection";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import styles from "../jobsListSection/JobsListSection.module.css";

import { useState, useEffect, useRef, useContext } from "react";
import { usePaginationWithURL } from "../../apiHooks/usePaginationWithURL";
import { useGetPaginatedJobs } from "../../apiHooks/useJobs";
import { SearchContext } from "../../contexts/SearchContext";
import { useSearchJobs } from "../../apiHooks/useJobs";

export default function JobsPage() {
  const sectionRef = useRef(null);

  const { urlPageNumber, setUrlPageNumber, technologyFilter } = usePaginationWithURL();
  const { jobs, isLoading, totalPages, error } = useGetPaginatedJobs(urlPageNumber, technologyFilter);

  const { 
    searchParams, 
    searchContextResults, 
    setSearchContextResults,
    searchTotalPage,
    setSearchTotalPage,
   } = useContext(SearchContext);

  const { submitSearch } = useSearchJobs();

  const [updateJobList, setUpdatedJobList] = useState([]);
  const [displayError, setDisplayError] = useState(null);


  // Fetch search results with pagination
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchParams) return;

      const result = await submitSearch(searchParams, urlPageNumber );
      
      if (result?.data?.items) {
        setSearchContextResults(result.data.items);
      }

      if(result?.data?.pagination) {
        setSearchTotalPage(result.data.pagination.totalPages);
      }
    };

    fetchSearchResults();
  }, [searchParams, urlPageNumber]);
  

  // Decide what jobs to show
  useEffect(() => {
    if (searchContextResults) {
      setUpdatedJobList(searchContextResults);
      
    } else if (jobs && jobs.length > 0) {
      setUpdatedJobList(jobs);
    }
  }, [jobs, searchContextResults]);

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

  const effectivePage = setSearchTotalPage ? searchTotalPage : totalPages;

  const nextPage = () => {
    if (urlPageNumber < effectivePage) {
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
              totalPages={effectivePage}
              onPrevPage={prevPage}
              onNextPage={nextPage}
            />
          </section>
        </>
      )}
    </>
  );
}
