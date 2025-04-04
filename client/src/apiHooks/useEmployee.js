import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import {
  getEmployeeProfileById,
  getPaginatedEmployees,
  getEmployeeProfile,
  createEmployeeProfile,
  addEmployeeExperience,
  addEmployeeEducation,
  deleteEmployeeExperience,
  deleteEmployeeEducation,
  editEmployeeProfile,
  getGitHubRepo,
  deleteEmployeeProfile,
} from "../api/eployeeApi";

export function useGetPaginatedEmployeeProfile(urlPageNumber) {
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

  useEffect(() => {
    let isMounted = true;

    const fetchEmployees = async () => {
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const response = await getPaginatedEmployees(currentPage);

        if (isMounted) {
          if (response.isError === true) {
            setError(response.message);
            setEmployees([]);
          }

          //the response structure is { success, data: { items: [] } }
          else if (!response.data || !Array.isArray(response.data.items)) {
            setEmployees([]);
          } else {
            setEmployees(response.data.items);

            setTotalPages(response.data.pagination.totalPages);
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
  const { role } = useContext(AuthContext);
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function refreshData() {
    setRefreshKey((prevKey) => prevKey + 1);
  }

  useEffect(() => {
    let isMounted = true;

    const fetchProfileData = async () => {
      if (role !== "employee") {
        if (isMounted) {
          setEmployee(null);
          setError(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setIsLoading(true);
          setError(null);
        }

        const response = await getEmployeeProfile();

        if (isMounted) {
          if (response.isError === true) {
            setError(response.message);
            setEmployee(null);
          } else {
            setEmployee(response);
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setEmployee(null);
          setIsLoading(false);
        }
      }
    };

    fetchProfileData();

    return () => {
      isMounted = false;
    };
  }, [refreshKey, role]);

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

export function useEditEmployeeProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const editBasicProfile = async (profileData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await editEmployeeProfile(profileData);

      if (response.isError === true) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    editBasicProfile,
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
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const response = await getEmployeeProfileById(id);

        if (isMounted) {
          if (!response) {
            setEmployee(null);
          } else if (response.isError === true) {
            setError(response.message);
          } else {
            setEmployee(response);
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
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const response = await getGitHubRepo(username);
        if (isMounted) {
          if (!response) {
            setprofileRepo(null);
          } else if (response.isError === true) {
            setError(response.message);
          } else {
            setprofileRepo(response);
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
  }, [username]);

  return {
    profileRepo,
    isLoading,
    error,
  };
}

export function useDeleteEmployeeProfile() {
  const [error, setError] = useState(null);

  const submitDelProfile = async () => {
    try {
      setError(null);

      const response = await deleteEmployeeProfile();
      if (response.isError === true) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError(err);
    }
  };
  return {
    submitDelProfile,
    error,
  };
}
