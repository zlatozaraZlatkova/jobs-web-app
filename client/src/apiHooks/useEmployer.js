import { useState, useEffect } from "react";
import { createCompanyProfile, editProfile, getProfileById, getCompanyList } from "../api/employerApi";

export function useCreateCompanyProfile() {
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [error, setError] = useState(null);

  const submitCompanyProfile = async (formData) => {
    try {
      setIsSubmittingProfile(true);
      setError(null);

      const response = await createCompanyProfile(formData);

      if (response.isError === true) {
        setError(response.message);
      }

      return response;
    } catch (err) {
      setError(err.message);
      setIsSubmittingProfile(false);
    }
  };

  return {
    isSubmittingProfile,
    submitCompanyProfile,
    error,
  };
}

export function useGetAdminProfile() {
  const [profileData, setProfileData] = useState({});
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

      setIsLoading(true);
      setError(null);

      try {
        const response = await getProfileById();


        if (response.isError === true) {
          setError(response.message);
        } else {
          setProfileData(response);
        }

        setIsLoading(false);

      } catch (err) {
        setError(null);
        setProfileData(null);
        setIsLoading(false);
      }
    };

    fetchProfileData();

  }, [refreshKey]);

  return {
    profileData,
    isLoading,
    refreshData,
    error,
  };
}

export function useEditCompanyProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const editCompany = async (companyData, companyId) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await editProfile(companyId, companyData);

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
    editCompany,
    error,
  };
}

export function useFetchingInitialData(id) {
  const [initialCompanyData, setInitialCompanyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {


    if (!id) {
      return;
    }

    async function fetchCompanyData() {

      setError(null);


      try {
        const response = await getProfileById(id);


        if (response.isError === true) {
          setError(response.message);
        }

        setInitialCompanyData(response);

      } catch (err) {

        setError(err.message);
        setInitialCompanyData(null);

      }
    }

    fetchCompanyData();
  }, [id]);

  return {
    initialCompanyData,
    error,
  };
}

export function useGetCompanyList() {
  const [companies, setCompanies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchCompaniesData = async () => {

      setError(null);

      try {
        const response = await getCompanyList();


        if (response.isError === true) {
          setError(response.message);
        }

        setCompanies(response);

      } catch (err) {

        setError(err.message);

      }
    };

    fetchCompaniesData();

  }, []);

  return {
    companies,
    error,
  };
}
