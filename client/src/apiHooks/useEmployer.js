import { useState } from "react";
import { createCompanyProfile } from "../api/employerApi";

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
    submitCompanyProfile
  };
}
