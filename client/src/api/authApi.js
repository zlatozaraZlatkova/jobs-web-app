import * as request from "./requester";

const BASE_URL = `/api/auth`;

export const login = async (email, password) => {
  try {
    return await request.post(`${BASE_URL}/login`, { email, password }, { credentials: 'include' });
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


export const register = async (name, email, password, role) => {
  try {
    const response = await request.post(`${BASE_URL}/register`, { name, email, password, role }, { credentials: 'include' });
    return response;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};


export const logout = async () => {
  try {
    const response = await request.get(`${BASE_URL}/logout`, null, { credentials: 'include' });

    return response;

  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export const verifyToken = async () => {
  try {
    return await request.get(`${BASE_URL}/validate`, null, { credentials: 'include' });

  } catch (error) {
    console.error("Token validation error:", error);
    throw error;
  }
};
