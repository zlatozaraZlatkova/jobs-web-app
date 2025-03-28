import { useState, useEffect } from "react";
import { getGitHubRepo, getEmployeeProfileById, getPaginatedEmployees, getEmployeeProfile, createEmployeeProfile, addEmployeeExperience, addEmployeeEducation, deleteEmployeeExperience, deleteEmployeeEducation } from "../api/eployeeApi";

export function useGetPafinatedEmployeeProfile(urlPageNumber) {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (urlPageNumber) {
      console.log("URL page changed to:", urlPageNumber);
      setCurrentPage(urlPageNumber);
    }
  }, [urlPageNumber]);

   console.log("Current internal page:", currentPage);


  useEffect(() => {
    let isMounted = true;

    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getPaginatedEmployees(currentPage);

        if (!isMounted) {
          return;
        }

        if (response.isError === true) {
          setError(response.message);
          setEmployees([]);
          return;
        }

        //the response structure is { success, data: { items: [] } }
        if (!response.data || !Array.isArray(response.data.items)) {
          setEmployees([]);
          return;
        }

        setEmployees(response.data.items);

        setTotalPages(response.data.pagination.totalPages);
        
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
  
    fetchEmployees();

    return () => {
      isMounted = false;
    };

  }, [currentPage]);

  return {
    employees,
    isLoading,
    totalPages,
    error,
  };
}

export function useGetEmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function refreshData() {
    setRefreshKey(function (currentValue) {
      return currentValue + 1;
    });
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getEmployeeProfile();

        if (response.isError === true) {
          setError(response.message);
          setEmployee(null);
        }

        setEmployee(response);
      } catch (err) {
        setError(err.message);
        setEmployee(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [refreshKey]);

  return {
    employee,
    isLoading,
    error,
    refreshData,
  };
}

export function useProfileApi() {
  const [error, setError] = useState(null);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

  const submitProfile = async (formData) => {
    try {
      setIsSubmittingProfile(true);
      setError(null);

      const response = await createEmployeeProfile(formData);

      if (response.isError === true) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      setError(err.message);
      setIsSubmittingProfile(false);
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  return {
    submitProfile,
    isSubmittingProfile,
    error,
  };
}

export function useExperienceApi() {
  const [error, setError] = useState(null);
  const [isSubmittingExperience, setIsSubmittingExperience] = useState(false);

  const submitExperience = async (formData) => {
    try {
      setIsSubmittingExperience(true);
      setError(null);

      const response = await addEmployeeExperience(formData);
      if (response.isError === true) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      setError(err.message);
      setIsSubmittingExperience(false);
    } finally {
      setIsSubmittingExperience(false);
    }
  };

  return {
    submitExperience,
    isSubmittingExperience,
    error,
  };
}

export function useEducationApi() {
  const [error, setError] = useState(null);
  const [isSubmittingEducation, setIsSubmittingEducation] = useState(false);

  const submitEducation = async (formData) => {
    try {
      setIsSubmittingEducation(true);
      setError(null);

      const response = await addEmployeeEducation(formData);

      if (response.isError === true) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      setError(err.message);
      setIsSubmittingEducation(false);
    } finally {
      setIsSubmittingEducation(false);
    }
  };
  return {
    submitEducation,
    isSubmittingEducation,
    error,
  };
}

export function useDeleteExperience() {
  const [error, setError] = useState(null);

  const submitDelExp = async (id) => {
    try {
      setError(null);

      const response = await deleteEmployeeExperience(id);
      if (response.isError === true) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError(err.message);
    }
  };
  return {
    submitDelExp,
    error,
  };
}

export function useDeleteEducation() {
  const [error, setError] = useState(null);

  const submitDelEduc = async (id) => {
    try {
      setError(null);

      const response = await deleteEmployeeEducation(id);
      if (response.isError === true) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError(err.message);
    }
  };
  return {
    submitDelEduc,
    error,
  };
}



export function useGetEmployeeProfileById(id) {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getEmployeeProfileById(id);

        if (!response) {
          setEmployee(null);
          return;
        }

        if (response.isError === true) {
          setError(response.message);
        }

        setEmployee(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return {
    employee,
    isLoading,
    error,
  };
}

export function useGetGitHubProfile(username) {
  const [profileRepo, setprofileRepo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getGitHubRepo(username);
        console.log("Response data after fetching", response)
        if (!response) {
          setprofileRepo(null);
          return;
        }
        if (response.isError === true) {
          setError(response.message);
        }
        setprofileRepo(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return {
    profileRepo,
    isLoading,
    error,
  };
}