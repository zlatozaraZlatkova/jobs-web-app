import { useState, useEffect } from "react";
import { getPaginatedJobs, createJob, getJobById, updateJob, deleteJob } from "../api/jobsApi";

export function useGetPaginatedJobs(urlPageNumber) {
  //console.log("Hook received urlParameters:", urlPageNumber);
  
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(urlPageNumber || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (urlPageNumber) {
      //console.log("URL page changed to:", urlPageNumber);
      setCurrentPage(urlPageNumber);
    }
  }, [urlPageNumber]);


  //console.log("Current internal page:", currentPage);


  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const result = await getPaginatedJobs(currentPage);

        if (!isMounted) {
          return
        }

        if (result.isError) {
          console.error("API returned an error:", result.message);
          setJobs([]);
          return;
        }

        if (result.data && Array.isArray(result.data.items)) {
          setJobs(result.data.items);
          setTotalPages(result.data.pagination.totalPages);
        } else {
          setJobs([]);
        }
      } catch (err) {
       
        if (!isMounted) {
          console.error("Error fetching jobs:", err);
          return;
        }

      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchJobs();
    
    return () => {
      isMounted = false;
    };

  }, [currentPage]);

  return {
    jobs,
    isLoading,
    totalPages,
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
  const submitDelJob = async (id) => {
    try {
      const response = await deleteJob(id);
      if (response.isError === true) {
        throw new Error(response.message);
      }
      return response;
    } catch (error) {
      console.error("Job deleting error:", error);
      throw error;
    }
  };
  return {
    submitDelJob,
  };
}