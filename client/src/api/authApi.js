import * as request from "./requester";

const BASE_URL = `/api/auth`;

export const login = async (email, password) => {
  try {
    return await request.post(`${BASE_URL}/login`, { email, password });
  } catch (error) {
    console.error("login error:", error);
    throw error;
  }
};

