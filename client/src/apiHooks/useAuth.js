import { useState } from "react";
import { login, register } from "../api/authApi";


export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const loginHandler = async (email, password) => {
    try {
      setIsLoading(true);

      const result = await login(email, password);
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
    loginHandler,
  };
}


export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const registerHandler = async(name, email, password, role) => {

    try {
      setIsLoading(true);
      
      const result = await register(name, email, password, role);
      console.log("Registration successful:", result);
      
      setUser(result);
      return result;

    } catch (err) {
      console.error("Registration error:", err);
      return null;

    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    registerHandler
  };
}
