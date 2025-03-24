import { useState, useEffect } from "react";
import { getPaginatedEmployees, getEmployeeProfile, createEmployeeProfile, addEmployeeExperience, addEmployeeEducation, deleteEmployeeExperience, deleteEmployeeEducation } from "../api/eployeeApi";

export function useGetPafinatedEmployeeProfile() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);

        const response = await getPaginatedEmployees(currentPage);
        
        if (response.isError === true) {
          throw new Error(response.message);
        }

        //the response structure is { success, data: { items: [] } }
        if (!response.data || !Array.isArray(response.data.items)) {
          setEmployees([]);
          return;
        }

        setEmployees(response.data.items);

        setTotalPages(response.data.pagination.totalPages);

      } catch (err) {
        console.error("Error fetching employees:", err);
        throw err;

      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [currentPage]);

  return {
    employees,
    setEmployees,
    isLoading,
    setIsLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
  };
}

export function useGetEmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        const response = await getEmployeeProfile();

        if (response.isError === true) {
          throw new Error(response.message);
        }

        setEmployee(response);
      } catch (err) {
        console.error("Error fetching employee profile:", err);
        throw err;

      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [refreshKey]);

  return {
    employee,
    isLoading,
    refreshData
  };
}

export function useProfileApi() {
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

  const submitProfile = async (formData) => {
    try {
      setIsSubmittingProfile(true);

      const response = await createEmployeeProfile(formData);

      if (response.isError === true) {
        throw new Error(response.message);
      }

      return response;
    } catch (err) {
      console.error("Profile creation error:", err);
      throw err;

    } finally {
      setIsSubmittingProfile(false);
    }
  };

  return {
    submitProfile,
    isSubmittingProfile,
  };
}

export function useExperienceApi() {
  const [isSubmittingExperience, setIsSubmittingExperience] = useState(false);

  const submitExperience = async (formData) => {
    try {
      setIsSubmittingExperience(true);

      const response = await addEmployeeExperience(formData);
      if (response.isError === true) {
        throw new Error(response.message);
      }

      return response;
    } catch (err) {
      console.error("Failed to save experience. Please try again.", err);
      throw err;

    } finally {
      setIsSubmittingExperience(false);
    }
  };

  return {
    submitExperience,
    isSubmittingExperience,
  };
}

export function useEducationApi() {
  const [isSubmittingEducation, setIsSubmittingEducation] = useState(false);

  const submitEducation = async (formData) => {
    try {
      setIsSubmittingEducation(true);
      const response = await addEmployeeEducation(formData);

      if (response.isError === true) {
        throw new Error(response.message);
      }

      return response;
    } catch (err) {
      console.error("Failed to save education. Please try again.", err);
      throw err;

    } finally {
      setIsSubmittingEducation(false);
    }
  };
  return {
    submitEducation,
    isSubmittingEducation,
  };
}

export function useDeleteExperience() {
  const submitDelExp = async (id) => {
    try {
      const response = await deleteEmployeeExperience(id);
      if (response.isError === true) {
        throw new Error(response.message);
      }
      return response;
    } catch (error) {
      console.error("Exp deleting error:", error);
      throw error;
    }
  };
  return {
    submitDelExp,
  };
}

export function useDeleteEducation() {
  const submitDelEduc = async (id) => {
    try {
      const response = await deleteEmployeeEducation(id);
      if (response.isError === true) {
        throw new Error(response.message);
      }
      return response;
    } catch (error) {
      console.error("Educ deleting error:", error);
      throw error;
    }
  };
  return {
    submitDelEduc,
  };
}