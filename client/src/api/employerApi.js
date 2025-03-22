import * as request from "./requester";

const BASE_URL = `/api/company/profile`;

export const createCompanyProfile = async (companyData) => {
  try {  
    return await request.post(`${BASE_URL}/create`, companyData, {
      credentials: "include",
    });
  } catch (error) {
    console.error("createCompanyProfile error:", error);
    throw error;
  }
};

export const getProfileById = async() => {
  try {
    return await request.get(`${BASE_URL}/employer`)
  } catch (error) {
    console.error("getProfileById error:", error);
    throw error;
  }
}

