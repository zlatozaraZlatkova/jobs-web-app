import * as request from "./requester";

const JOBS_LIST_URL = `/api/jobs/list`;

export const getAllJobs = async () => {
    try {
      return await request.get(JOBS_LIST_URL);
      
    } catch (error) {
      console.error("getAllJobs error:", error);
      throw error;
    }
  };