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
      setCurrentPage(urlPageNumber);
    }
  }, [urlPageNumber]);

  useEffect(() => {


    const fetchEmployees = async () => {

      setIsLoading(true);
      setError(null);


      try {
        const response = await getPaginatedEmployees(currentPage);


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

      } catch (err) {

        setError(err);
        setIsLoading(false);

      }
    };

    fetchEmployees();

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
  const [profileExists, setProfileExists] = useState(false);

  function refreshData() {
    setRefreshKey((prevKey) => prevKey + 1);
  }

  useEffect(() => {


    const fetchProfileData = async () => {
      if (role !== "employee") {

        setEmployee(null);
        setError(null);
        setIsLoading(false);
        setProfileExists(false);

        return;
      }

      try {

        setIsLoading(true);
        setError(null);


        const response = await getEmployeeProfile();


        if (response && response.isError === true) {

          if (response.message.includes("There is no profile for this user.") || response.status === 400 || response.statusCode === 400) {
            setError(null);
            setProfileExists(false);
          } else {
            setError(response.message);
            setProfileExists(false);
          }

          setEmployee(null);

        } else {
          setEmployee(response);
          setProfileExists(true);
          setError(null);
        }

        setIsLoading(false);

      } catch (err) {

        setError(err.message);
        setEmployee(null);
        setIsLoading(false);
        setProfileExists(false);

      }
    };

    fetchProfileData();

  }, [refreshKey, role]);

  return {
    employee,
    isLoading,
    error,
    refreshData,
    profileExists
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

    const fetchData = async () => {

      setIsLoading(true);
      setError(null);


      try {
        const response = await getEmployeeProfileById(id);


        if (!response) {
          setEmployee(null);
        } else if (response.isError === true) {
          setError(response.message);
        } else {
          setEmployee(response);
        }

        setIsLoading(false);

      } catch (err) {

        setError(err);
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

      setIsLoading(true);
      setError(null);


      try {
        const response = await getGitHubRepo(username);

        if (!response) {
          setprofileRepo(null);
        } else if (response.isError === true) {
          setError(response.message);
        } else {
          setprofileRepo(response);
        }
        setIsLoading(false);

      } catch (err) {

        setError(err);
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
