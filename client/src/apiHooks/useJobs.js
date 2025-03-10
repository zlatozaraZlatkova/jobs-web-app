import { useState, useEffect } from "react";
import { getPaginatedJobs } from "../api/jobsApi";


export function useGetPaginatedJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

      
      return {
        jobs,
        setJobs,
        isLoading,
        setIsLoading,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages
      };
}