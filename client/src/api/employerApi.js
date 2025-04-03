import * as request from "./requester";

const BASE_URL = `/api/company/profile`;

export const createCompanyProfile = async (companyData) => {
  return await request.post(`${BASE_URL}/create`, companyData, {
    credentials: "include",
  });
};

export const getProfileById = async () => {
  return await request.get(`${BASE_URL}`, null, {
    credentials: "include",
  });
};

export const editProfile = async (companyId, companyData) => {
  return await request.put(`${BASE_URL}/update/${companyId}`, companyData, {
    credentials: "include",
  });
};
