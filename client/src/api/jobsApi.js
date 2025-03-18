import * as request from "./requester";

const BASE_URL = `/api/jobs`;
const JOBS_LIST_URL = `${BASE_URL}/list`;

export const getAllJobs = async () => {
  try {
    return await request.get(JOBS_LIST_URL);
  } catch (error) {
    console.error("getAllJobs error:", error);
    throw error;
  }
};

export const getPaginatedJobs = async (currentPage, limit = 3) => {
  try {
    const url = `${BASE_URL}?page=${currentPage}&limit=${limit}`;

    return await request.get(url);
  } catch (error) {
    console.error("getPaginatedJobs error:", error);
    throw error;
  }
};

export const getJobById = async (id) => {
  try {
    const url = `${BASE_URL}/${id}`;

    return await request.get(url);
  } catch (error) {
    console.error("getAllJobs error:", error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    return await request.post(`${BASE_URL}/create`, jobData, {
      credentials: "include",
    });
  } catch (error) {
    console.error("createJob error:", error);
    throw error;
  }
};

export const updateJob = async (jobData, id) => {
  try {
    return await request.put(`${BASE_URL}/update/${id}`, jobData, {
      credentials: "include",
    });
  } catch (error) {
    console.error("editJob error:", error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    return await request.del(`${BASE_URL}/delete/${id}`);
  } catch (error) {
    console.log("deleteJob error:", error);
    throw error;
  }
};
