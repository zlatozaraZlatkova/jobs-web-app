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

export const editProfile = async (companyId, companyData) => {
  try {
    console.log("Making PUT request to:", `${BASE_URL}/update/${companyId}`);
    
    return await request.put(`${BASE_URL}/update/${companyId}`, companyData, {
      credentials: "include",
    });
  } catch (error) {
    console.error("editCompanyProfile error:", error);
    throw error;
  }
}