import { useState, useEffect } from "react";
import {getAllJobs, getPaginatedJobs, createJob, getJobById, updateJob, deleteJob } from "../api/jobsApi";

export function useGetPaginatedJobs(urlPageNumber, technologyFilter) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(urlPageNumber || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

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
        setError(null);

        const result = await getPaginatedJobs(currentPage, technologyFilter);

        if (!isMounted) {
          return;
        }

        if (result.isError === true) {
          setError(result.message);
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
          setError(err);
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
  }, [currentPage, technologyFilter]);

  return {
    jobs,
    isLoading,
    totalPages,
    error,
  };
}

export function useGetJobDetails(id) {
  const [currentJob, setCurrentJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getJobById(id);

        if (!response) {
          setCurrentJob(null);
          return;
        }

        if (response.isError === true) {
          setError(response.message);
        }

        setCurrentJob(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);
  return {
    currentJob,
    isLoading,
    error,
  };
}

export function useGetCategoriesJob() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [frontendTechnologies, setFrontendTechnologies] = useState([]);
  const [backendTechnologies, setBackendTechnologies] = useState([]);
  const [erros, setErros] = useState(null);
  
    useEffect(() => {
  
      const fetchAllJobs = async () => {
        try {
          setIsLoading(true);
          setErros(null);
  
          const reasponse = await getAllJobs();

          if(reasponse.isError === true) {
            setErros(reasponse.message);
          }
          
          if (reasponse.length === 0) {
            setJobs([]);
            setFrontendTechnologies([]);
            setBackendTechnologies([]);
            return;
          }
  
  
          setJobs(reasponse);
         
          const frontend = reasponse.filter(job => job.technologies === "frontend");
          const backend = reasponse.filter(job => job.technologies === "backend");
  
          setFrontendTechnologies(frontend);
          setBackendTechnologies(backend);
  
  
        } catch (err) {
          setJobs([]);
          setFrontendTechnologies([]);
          setBackendTechnologies([]);
  
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchAllJobs();
    }, []);
  
  return {
    isLoading,
    jobs,
    frontendTechnologies,
    backendTechnologies,
    erros
  }
}

export function useCreateJob() {
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);
  const [error, setError] = useState(null);

  const submitJob = async (formData) => {
    try {
      setIsSubmittingJob(true);
      setError(null);

      const response = await createJob(formData);

      if (response.isError === true) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      setError(err);
    } finally {
      setIsSubmittingJob(false);
    }
  };

  return {
    isSubmittingJob,
    submitJob,
    error,
  };
}

export function useEditJob() {
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);
  const [error, setError] = useState(null);

  const editJob = async (jobData, id) => {
    try {
      setIsSubmittingJob(true);
      setError(null);

      const response = await updateJob(jobData, id);

      if (response.isError === true) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      setError(err);
    } finally {
      setIsSubmittingJob(false);
    }
  };

  return {
    isSubmittingJob,
    editJob,
    error,
  };
}

export function useFetchingInitialData(id) {
  const [initialJobData, setInitialJobData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobData() {
      if (!id) {
        return;
      }

      try {
        setError(null);

        const response = await getJobById(id);

        if (response.isError === true) {
          setError(response.message);
        }

        setInitialJobData(response);
      } catch (err) {
        setError(err);
      }
    }

    fetchJobData();
  }, [id]);

  return {
    initialJobData,
    error,
  };
}

export function useDeleteJob() {
  const [error, setError] = useState(null);

  const submitDelJob = async (id) => {
    try {
      setError(null);

      const response = await deleteJob(id);
      if (response.isError === true) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError(err);
    }
  };
  return {
    submitDelJob,
    error,
  };
}
