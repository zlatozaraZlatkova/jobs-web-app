import * as request from "./requester";

const BASE_URL = `/api/profile`;

export const getEmployeeProfile = async () => {
  return await request.get(`${BASE_URL}`, null, { credentials: "include" });
};

export const getPaginatedEmployees = async (currentPage, limit = 3) => {
  const url = `${BASE_URL}/catalog?page=${currentPage}&limit=${limit}`;
  return await request.get(url);
};

export const getEmployeeProfileById = async (id) => {
  const url = `${BASE_URL}/catalog/${id}`;

  return await request.get(url);
};

export const createEmployeeProfile = async (profileData) => {
  return await request.post(`${BASE_URL}/create`, profileData, {
    credentials: "include",
  });
};

export const addEmployeeExperience = async (experienceData) => {
  return await request.put(`${BASE_URL}/experience`, experienceData, {
    credentials: "include",
  });
};

export const addEmployeeEducation = async (educationData) => {
  return await request.put(`${BASE_URL}/education`, educationData, {
    credentials: "include",
  });
};

export const deleteEmployeeExperience = async (id) => {
  return await request.del(`${BASE_URL}/experience/${id}`);
};

export const deleteEmployeeEducation = async (id) => {
  return await request.del(`${BASE_URL}/education/${id}`);
};

export const getGitHubRepo = async (username) => {
  return await request.get(`${BASE_URL}/github/${username}`);
};

export const editEmployeeProfile = async (profileData) => {
  return await request.post(`${BASE_URL}/update`, profileData, {
    credentials: "include",
  });
};

export const deleteEmployeeProfile = async () => {
  return await request.del(`${BASE_URL}/delete`);
};
