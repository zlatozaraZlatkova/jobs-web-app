import { useState, useEffect } from "react";
import {
  getPaginatedJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
} from "../api/jobsApi";

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

export function useEditJob() {
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);

  const editJob = async (jobData, id) => {
    try {
      setIsSubmittingJob(true);
      const response = await updateJob(jobData, id);

      if (response.isError === true) {
        throw new Error(response.message);
      }

      return response;
    } catch (error) {
      console.error("Job updating error:", error);
      throw error;
    } finally {
      setIsSubmittingJob(false);
    }
  };

  return {
    isSubmittingJob,
    editJob,
  };
}

export function useFetchingInitialData(id) {
  const [initialJobData, setInitialJobData] = useState(null);

  useEffect(() => {
    async function fetchJobData() {
      if (!id) {
        return;
      }

      try {
        const response = await getJobById(id);

        if (response.isError === true) {
          throw new Error(response.message);
        }

        setInitialJobData(response);
      } catch (err) {
        console.error("Error fetching job data:", err);
        throw err;
      }
    }

    fetchJobData();
  }, [id]);

  return { initialJobData };
}

export function useDeleteJob() {
  const submitDelJob = async(id) => {
    try {
      const response = await deleteJob(id);
      if(response.isError === true) {
        throw new Error(response.message);
      }
      return response;
    } catch (error) {
      console.error("Job deleting error:", error);
      throw error;
    }
  }
  return {
    submitDelJob
  }
}