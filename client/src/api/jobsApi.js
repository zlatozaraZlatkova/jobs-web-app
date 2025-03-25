import * as request from "./requester";

const BASE_URL = `/api/jobs`;
const JOBS_LIST_URL = `${BASE_URL}/list`;

export const getAllJobs = async () => {
  return await request.get(JOBS_LIST_URL);
};

export const getPaginatedJobs = async (currentPage, technology = null, limit = 3) => {
  let url = `${BASE_URL}?page=${currentPage}&limit=${limit}`;

  if (technology) {
    url += `&technology=${technology}`;
  }

  return await request.get(url);
};

export const getJobById = async (id) => {
  const url = `${BASE_URL}/${id}`;

  return await request.get(url);
};

export const createJob = async (jobData) => {
  return await request.post(`${BASE_URL}/create`, jobData, {
    credentials: "include",
  });
};

export const updateJob = async (jobData, id) => {
  return await request.put(`${BASE_URL}/update/${id}`, jobData, {
    credentials: "include",
  });
};

export const deleteJob = async (id) => {
  return await request.del(`${BASE_URL}/delete/${id}`);
};
