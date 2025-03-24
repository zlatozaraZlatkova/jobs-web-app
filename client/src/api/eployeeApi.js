import * as request from "./requester";

const BASE_URL = `/api/profile`;

export const getEmployeeProfile = async () => {
  try {
    return await request.get(`${BASE_URL}`, null, { credentials: 'include' });
  } catch (error) {
    console.error("getEmployeeProfile error:", error);
    throw error;
  }
};

export const getPaginatedEmployees = async (currentPage, limit = 3) => {
  try {
    const url = `${BASE_URL}/catalog?page=${currentPage}&limit=${limit}`;

    return await request.get(url);
  } catch (error) {
    console.error("getPaginatedEmployees error:", error);
    throw error;
  }
};


export const createEmployeeProfile = async (profileData) => {
  try {
    return await request.post(`${BASE_URL}/create`, profileData, { credentials: 'include' });
  } catch (error) {
    console.error("createEmployeeProfile error:", error);
    throw error;
  }
};


export const addEmployeeExperience = async (experienceData) => {
  try {
    return await request.put(`${BASE_URL}/experience`, experienceData, { credentials: 'include' });
  } catch (error) {
    console.error("addEmployeeExperience error:", error);
    throw error;
  }
};


export const addEmployeeEducation = async (educationData) => {
  try {
    return await request.put(`${BASE_URL}/education`, educationData, { credentials: 'include' });
  } catch (error) {
    console.error("addEmployeeEducation error:", error);
    throw error;
  }
}

export const deleteEmployeeExperience = async (id) => {
  try {
    return await request.del(`${BASE_URL}/experience/${id}`);
  } catch (error) {
    console.log("deleteEmployeeExp error:", error);
    throw error;
  }
};
