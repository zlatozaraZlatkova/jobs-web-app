import * as request from "./requester";

const BASE_URL = `/api/auth`;

export const login = async (email, password) => {
  try {
    return await request.post(`${BASE_URL}/login`, { email, password });
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


export const register = async (name, email, password, role) => {
  try {
    const response = await request.post(`${BASE_URL}/register`, { name, email, password, role });
    return response;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};