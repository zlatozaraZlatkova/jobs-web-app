import { useState, useEffect } from "react";
import { getAllJobs, getPaginatedJobs, createJob, getJobById, updateJob, deleteJob, pinJob, unpinJob, searchJobs } from "../api/jobsApi";
import { useGetEmployeeProfile } from "./useEmployee";

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
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const result = await getPaginatedJobs(currentPage, technologyFilter);

        if (isMounted) {
          if (result.isError === true) {
            setError(result.message);
            setJobs([]);
          } else if (result.data && Array.isArray(result.data.items)) {
            setJobs(result.data.items);
            setTotalPages(result.data.pagination.totalPages);
          } else {
            setJobs([]);
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
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
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const response = await getJobById(id);

        if (isMounted) {
          if (!response) {
            setCurrentJob(null);
            return;

          } else if (response.isError === true) {
            setError(response.message);

          } else {
            setCurrentJob(response);
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
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
    let isMounted = true;

    const fetchAllJobs = async () => {
      if (isMounted) {
        setIsLoading(true);
        setErros(null);
      }

      try {
        const reasponse = await getAllJobs();

        if (isMounted) {
          if (reasponse.isError === true) {
            setErros(reasponse.message);

          } else if (reasponse.length === 0) {
            setJobs([]);
            setFrontendTechnologies([]);
            setBackendTechnologies([]);

          } else {
            setJobs(reasponse);

            const frontend = reasponse.filter(
              (job) => job.technologies === "frontend"
            );
            const backend = reasponse.filter(
              (job) => job.technologies === "backend"
            );

            setFrontendTechnologies(frontend);
            setBackendTechnologies(backend);
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setJobs([]);
          setFrontendTechnologies([]);
          setBackendTechnologies([]);
          setIsLoading(false);
        }
      }
    };

    fetchAllJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    isLoading,
    jobs,
    frontendTechnologies,
    backendTechnologies,
    erros,
  };
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
    let isMounted = true;
    async function fetchJobData() {
      if (!id) {
        return;
      }
      if (isMounted) {
        setError(null);
      }

      try {
        const response = await getJobById(id);
        if (isMounted) {
          if (response.isError === true) {
            setError(response.message);
          }
          setInitialJobData(response);
        }
      } catch (err) {
        setError(err);
      }
    }

    fetchJobData();
    return () => {
      isMounted = false;
    };
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

export function usePinJob() {
  const [error, setError] = useState(null);

  const submitPinJob = async (id) => {
    try {
      setError(null);

      const response = await pinJob(id);
      if (response.isError === true) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError(err);
    }
  };
  return {
    submitPinJob,
    error,
  };
}
export function useUnpinJob() {
  const [error, setError] = useState(null);

  const submitUnpinJob = async (id) => {
    try {
      setError(null);

      const response = await unpinJob(id);
      if (response.isError === true) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError(err);
    }
  };
  return {
    submitUnpinJob,
    error,
  };
}

export function useCanPinJobs(isEmployee) {
  const { employee: profileData, error } = useGetEmployeeProfile();
  const [canPinJobs, setCanPinJobs] = useState(false);

  useEffect(() => {
    if (!isEmployee) {
      setCanPinJobs(false);
      return;
    }

    if (profileData && !profileData.isError) {
      setCanPinJobs(true);
    } else {
      setCanPinJobs(false);
    }
  }, [isEmployee, profileData]);

  return {
    canPinJobs,
    error: isEmployee ? error : null,
  };
}

export function useSearchJobs() {
  const [error, setError] = useState(null);

  const submitSearch = async (searchParams) => {
    try {
      setError(null);

      const response = await searchJobs(searchParams);
      if (response.isError === true) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError(err);
    }
  };

  return {
    submitSearch,
    error,
  };
}

export function useFeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFeaturedJobs = async () => {
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const response = await getAllJobs();

        if (isMounted) {
          if (response.isError === true) {
            setError(response.message);
            setJobs([]);
          } else {
            setJobs(response);
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      }
    };

    fetchFeaturedJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  return { jobs, isLoading, error };
}
