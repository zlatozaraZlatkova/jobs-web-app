/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getPaginatedEmployees,getEmployeeProfile, createEmployeeProfile, addEmployeeExperience, addEmployeeEducation} from "../api/eployeeApi";

export function useGetPafinatedEmployeeProfile() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);

        const result = await getPaginatedEmployees(currentPage);

        //the response structure is { success, data: { items: [] } }
        if (!result.data || !Array.isArray(result.data.items)) {
          setEmployees([]);
          return;
        }

        setEmployees(result.data.items);

        setTotalPages(result.data.pagination.totalPages);
      } catch (err) {
        console.error("Error fetching employees:", err);
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
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const result = await getEmployeeProfile();
        console.log("Employee Profile response data:", result);

        if (!result.data || !Array.isArray(result.data.items)) {
          setProfile(null);
          return;
        }

        setProfile(result.data.items);
      } catch (err) {
        console.error("Error fetching employee profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return {
    profile,
    setProfile,
    isLoading,
    setIsLoading,
  };
}

export function useProfileApi() {
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

  const submitProfile = async (formData) => {
    try {
      setIsSubmittingProfile(true);

      const response = await createEmployeeProfile(formData);

      return response;
    } catch (err) {
      console.error("Profile creation error:", err);
      return null;
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
  const [ isSubmittingExperience, setIsSubmittingExperience] = useState(false);

  const submitExperience = async (formData) => {
    try {
      setIsSubmittingExperience(true);

      const response = await addEmployeeExperience(formData);

      return response;
    } catch (err) {
      console.error("Failed to save experience. Please try again.", err);
      return null;
    } finally {
      setIsSubmittingExperience(false);
    }
  };

  return {
    submitExperience,
    isSubmittingExperience
  };
}

export function useEducationApi() {
    const [isSubmittingEducation, setIsSubmittingEducation] = useState(false);

    const submitEducation = async(formData) => {
        try {
            setIsSubmittingEducation(true);
            const response = await addEmployeeEducation(formData);
            return response;

            
          } catch (err) {
            console.error("Failed to save education. Please try again.", err);
            return null;
          } finally {
            setIsSubmittingEducation(false);
          }

    }
    return{
        submitEducation,
        isSubmittingEducation
    }
}
