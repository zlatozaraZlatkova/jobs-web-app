import { useState, useEffect } from "react";
import { getPaginatedJobs, createJob } from "../api/jobsApi";

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
    setTotalPages,
  };
}

export function useCreateJob() {
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);

  const submitJob = async (formData) => {
    try {
      setIsSubmittingJob(true);

      const response = await createJob(formData);

      if (response.isError === true) {
        throw new Error(response.message);
      }

      return response;
    } catch (err) {
      console.error("Job creation error:", err);
      throw err;
    } finally {
      setIsSubmittingJob(false);
    }
  };

  return {
    isSubmittingJob,
    submitJob,
  };
}
