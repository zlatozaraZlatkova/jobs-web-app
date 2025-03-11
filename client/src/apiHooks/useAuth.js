/* eslint-disable no-unused-vars */
import { useState } from "react";
import { login } from "../api/authApi";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const loginHander = async (email, password) => {
    try {
      setIsLoading(true);

      const result = await login(email, password);
      console.log("Logged in user data:", result);

      setUser(result);

      return result;

    } catch (err) {
      console.error("Error user login:", err);
      return null;

    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    loginHander,
  };
}
