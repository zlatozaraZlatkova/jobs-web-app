import { useState, useEffect } from "react";
import { createCompanyProfile, editProfile, getProfileById } from "../api/employerApi";

export function useCreateCompanyProfile() {
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

  const submitCompanyProfile = async (formData) => {
    try {
      setIsSubmittingProfile(true);

      const response = await createCompanyProfile(formData);

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
    isSubmittingProfile,
    submitCompanyProfile,
  };
}

export function useGetAdminProfile() {
  const [profileData, setProfileData] = useState({});
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
        const result = await getProfileById();

        setProfileData(result);
      } catch (err) {
        console.error("Error fetching profile data:", err);

        setProfileData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [refreshKey]);

  return {
    profileData,
    isLoading,
    refreshData,
  };
}

export function useEditCompanyProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editCompany = async (companyData, companyId) => {
    try {
      setIsSubmitting(true);

      const response = await editProfile(companyId, companyData);

      if (response.isError === true) {
        throw new Error(response.message);
      }
      return response;

    } catch (err) {
      console.error("Profile creation error:", err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { 
    isSubmitting, 
    editCompany 
  };
}

export function useFetchingInitialData(id) {
  const [initialCompanyData, setInitialCompanyData] = useState(null);

  useEffect(() => {
    async function fetchCompanyData() {
      if (!id) {
        return;
      }

      try {
        const response = await getProfileById(id);
        console.log("Fetch data from response:", response);

        if (response.isError === true) {
          throw new Error(response.message);
        }

        setInitialCompanyData(response);
      } catch (err) {
        console.error("Error fetching job data:", err);
        throw err;
      }
    }

    fetchCompanyData();
  }, [id]);

  return { 
    initialCompanyData
   };
}
