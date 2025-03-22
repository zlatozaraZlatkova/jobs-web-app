import { useState, useEffect } from "react";
import { createCompanyProfile, getProfileById } from "../api/employerApi";

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
  }, []);

  return {
    profileData,
    isLoading,
  };
}
