import * as request from "./requester";

const BASE_URL = `/api/profile`;

export const getPaginatedEmployees = async (currentPage, limit = 3) => {
  try {
    const url = `${BASE_URL}/catalog?page=${currentPage}&limit=${limit}`;

    return await request.get(url);
  } catch (error) {
    console.error("getAllJobs error:", error);
    throw error;
  }
};
